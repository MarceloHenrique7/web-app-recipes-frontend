import WalletFundsForm from "@/form/wallet-form/FundsForm"

const WithdrawFundsPage = () => {
    return (
        <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col justify-between items-center gap-8">
                <h1 className="font-bold text-2xl">Withdraw Funds</h1>
                <p className="opacity-80">You can withdraw funds to your wallet</p>
            </div>
            <div>
                <WalletFundsForm type="WITHDRAW" submitTxt="With Draw"/>
            </div>
        </div>
    )
}


export default WithdrawFundsPage