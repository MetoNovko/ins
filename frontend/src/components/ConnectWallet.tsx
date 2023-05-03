import { useWalletStore } from "@/context/WalletContextProvider";
import React, { useEffect, useState } from "react";
import { chainGrpcBankApi, msgBroadcastClient } from "@/services/services";
import { Coin } from "@injectivelabs/ts-types";
import { denomAmountFromChainDenomAmountToFixed } from "@injectivelabs/sdk-ts";

type Props = {};

const ConnectWallet = (props: Props) => {
  const { connectWallet, injectiveAddress, injBalance } = useWalletStore();
  const btnText = injectiveAddress
    ? `${injectiveAddress.slice(0, 5)}...${injectiveAddress.slice(-3)}`
    : "Connect Wallet";

  return (
    <div className="flex justify-end items-center gap-5 mr-10">
      <button onClick={connectWallet} className="btn">
        {btnText}
      </button>
      {injBalance && (
        <div className="border-2 border-teal-500 text-white px-6 py-2 rounded-lg text-sm">
          {`${denomAmountFromChainDenomAmountToFixed({
            value: injBalance.amount,
          })} ${injBalance.denom}`}
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
