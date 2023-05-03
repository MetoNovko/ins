import { chainGrpcBankApi, denomClient } from "@/services/services";
import { getAddresses } from "@/services/wallet";
import { getInjectiveAddress } from "@injectivelabs/sdk-ts";
import { CoinGeckoMetrics } from "@injectivelabs/sdk-ui-ts";
import { Coin } from "@injectivelabs/ts-types";
import React, { createContext, useContext, useEffect, useState } from "react";

type StoreState = {
  injectiveAddress: string;
  ethereumAddress: string;
  connectWallet: () => void;
  injBalance: Coin | undefined;
  allBalances: Coin[] | undefined;
};

const WalletContext = createContext<StoreState>({
  ethereumAddress: "",
  injectiveAddress: "",
  connectWallet: () => {},
  injBalance: undefined,
  allBalances: undefined,
});

export const useWalletStore = () => useContext(WalletContext);

type Props = {
  children?: React.ReactNode;
};

const WalletContextProvider = (props: Props) => {
  const [ethereumAddress, setEthereumAddress] = useState("");
  const [injectiveAddress, setInjectiveAddress] = useState("");
  const [injBalance, setInjBalance] = useState<Coin | undefined>(undefined);
  const [allBalances, setAllBalances] = useState<Coin[] | undefined>(undefined);

  async function connectWallet() {
    const [address] = await getAddresses();
    setEthereumAddress(address);
    console.log(address);
    const injAddr = address.startsWith("0x")
      ? getInjectiveAddress(address)
      : address;
    setInjectiveAddress(injAddr);
    console.log(injAddr);

    chainGrpcBankApi
      .fetchBalance({ accountAddress: injAddr, denom: "inj" })
      .then(setInjBalance);

    chainGrpcBankApi
      .fetchBalances(injAddr)
      .then(({ balances }) => setAllBalances(balances.reverse()));
    // .then(() => {
    //   const tokenMeta =
    //     allBalances && denomClient.getDenomTokenInfo(allBalances[0].denom);
    //   return tokenMeta;
    // })
    // .then(console.log);
  }

  return (
    <WalletContext.Provider
      value={{
        ethereumAddress,
        injectiveAddress,
        connectWallet,
        injBalance,
        allBalances,
      }}
    >
      {props.children}
    </WalletContext.Provider>
  );
};

export default WalletContextProvider;
