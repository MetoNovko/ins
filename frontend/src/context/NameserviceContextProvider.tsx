import { NAMESERVICE_CONTRACT_ADDRESS } from "@/services/constants";
import {
  chainGrpcWasmApi,
  msgBroadcastClient,
  denomClientSync,
  denomClient,
} from "@/services/services";
import { getAddresses } from "@/services/wallet";
import {
  MsgExecuteContractCompat,
  fromBase64,
  getInjectiveAddress,
  toBase64,
  MsgSend,
} from "@injectivelabs/sdk-ts";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useWalletStore } from "./WalletContextProvider";
import { BigNumberInBase, BigNumberInWei } from "@injectivelabs/utils";

enum Status {
  Idle = "idle",
  Loading = "loading",
}

type StoreState = {
  config: { register_price: any; transfer_price: any };
  isLoading: boolean;
  resolvedName: string;
  resolvedAddr: string;
  error: string;
  registerName: (name: string) => void;
  transferName: (name: string, to: string) => void;
  resolveRecord: (name: string) => void;
  inverseResolve: (addr: string) => void;
  sendToName: (
    name: string,
    amount: number,
    denom?: string,
    decimals?: number
  ) => void;
};

const NameserviceContext = createContext<StoreState>({
  config: { register_price: null, transfer_price: null },
  isLoading: true,
  resolvedName: "",
  resolvedAddr: "",
  error: "",
  registerName: (name: string) => {},
  transferName: (name: string, to: string) => {},
  resolveRecord: (name: string) => {},
  inverseResolve: (addr: string) => {},
  sendToName: (
    name: string,
    amount: number,
    denom?: string,
    decimals?: number
  ) => {},
});

export const useNameserviceStore = () => useContext(NameserviceContext);

type Props = {
  children?: React.ReactNode;
};

const NameserviceContextProvider = (props: Props) => {
  const [config, setConfig] = useState({
    register_price: null,
    transfer_price: null,
  });
  const [error, setError] = useState("");
  const [resolvedName, setResolvedName] = useState("");
  const [resolvedAddr, setResolvedAddr] = useState("");
  const [status, setStatus] = useState<Status>(Status.Idle);
  const isLoading = status == Status.Loading;
  const { injectiveAddress } = useWalletStore();

  useEffect(() => {
    fetchConfig();
    setError("");
  }, []);

  async function fetchConfig() {
    try {
      const response = (await chainGrpcWasmApi.fetchSmartContractState(
        NAMESERVICE_CONTRACT_ADDRESS,
        toBase64({ config: {} })
      )) as unknown as { data: string };

      const config = fromBase64(response.data) as {
        register_price: any;
        transfer_price: any;
      };
      setConfig(config);
    } catch (e) {
      alert((e as any).message);
      setError((e as any).message);
    }
  }

  async function resolveRecord(name: string) {
    try {
      const response = (await chainGrpcWasmApi.fetchSmartContractState(
        NAMESERVICE_CONTRACT_ADDRESS,
        toBase64({ resolve_record: { name } })
      )) as unknown as { data: string };

      const { address } = fromBase64(response.data) as { address: string };
      setResolvedName(address);
    } catch (e) {
      alert((e as any).message);
      setError((e as any).message);
    }
  }

  async function inverseResolve(addr: string) {
    try {
      const response = (await chainGrpcWasmApi.fetchSmartContractState(
        NAMESERVICE_CONTRACT_ADDRESS,
        toBase64({ inverse_resolve: { addr } })
      )) as unknown as { data: string };

      const { name } = fromBase64(response.data) as { name: string };
      setResolvedAddr(name);
    } catch (e) {
      alert((e as any).message);
      setError((e as any).message);
    }
  }

  async function registerName(name: string) {
    if (!injectiveAddress) {
      alert("No Wallet Connected");
      return;
    }

    setStatus(Status.Loading);

    try {
      const msg = MsgExecuteContractCompat.fromJSON({
        contractAddress: NAMESERVICE_CONTRACT_ADDRESS,
        sender: injectiveAddress,
        msg: {
          register: { name },
        },
      });

      const res = await msgBroadcastClient.broadcast({
        msgs: msg,
        injectiveAddress: injectiveAddress,
      });
      if (res.rawLog.includes("Name has been taken")) {
        setError(`Name has been taken (name: ${name})`);
      }
    } catch (e: any) {
      console.log(e);
      const relevantErrorMessage = e.errorMessage.split(": ")[2];
      alert((e as any).message);
      setError(relevantErrorMessage);
    } finally {
      setStatus(Status.Idle);
    }
  }

  async function transferName(name: string, to: string) {
    if (!injectiveAddress) {
      alert("No Wallet Connected");
      return;
    }

    setStatus(Status.Loading);

    try {
      const msg = MsgExecuteContractCompat.fromJSON({
        contractAddress: NAMESERVICE_CONTRACT_ADDRESS,
        sender: injectiveAddress,
        msg: {
          transfer: { name, to },
        },
      });

      await msgBroadcastClient.broadcast({
        msgs: msg,
        injectiveAddress: injectiveAddress,
      });
    } catch (e) {
      alert((e as any).message);
      setError((e as any).message);
    } finally {
      setStatus(Status.Idle);
    }
  }

  async function sendToName(
    name: string,
    amount: number,
    denom?: string,
    decimals?: number
  ) {
    // console.log(denom, decimals);
    // console.log(denomClientSync.getDenomToken(denom ?? "inj"));
    // console.log(await denomClient.getDenomToken(denom ?? "inj"));
    if (!injectiveAddress) {
      alert("No Wallet Connected");
      return;
    }

    setStatus(Status.Loading);

    try {
      const bigAmount = {
        denom: denom ?? "inj",
        amount: new BigNumberInBase(amount).toWei(decimals ?? 18).toString(),
      };

      const response = (await chainGrpcWasmApi.fetchSmartContractState(
        NAMESERVICE_CONTRACT_ADDRESS,
        toBase64({ resolve_record: { name } })
      )) as unknown as { data: string };

      const { address: resolvedAddress } = fromBase64(response.data) as {
        address: string;
      };

      if (!resolvedAddress) throw new Error("No Such Name");

      const msg = MsgSend.fromJSON({
        amount: bigAmount,
        srcInjectiveAddress: injectiveAddress,
        dstInjectiveAddress: resolvedAddress,
      });

      await msgBroadcastClient.broadcast({
        msgs: msg,
        injectiveAddress: injectiveAddress,
      });
    } catch (e) {
      alert((e as any).message);
      setError((e as any).message);
    } finally {
      setStatus(Status.Idle);
    }
  }

  return (
    <NameserviceContext.Provider
      value={{
        config,
        isLoading,
        resolvedName,
        resolvedAddr,
        error,
        registerName,
        transferName,
        resolveRecord,
        inverseResolve,
        sendToName,
      }}
    >
      {props.children}
    </NameserviceContext.Provider>
  );
};

export default NameserviceContextProvider;
