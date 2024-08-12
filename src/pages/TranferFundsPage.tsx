import TransferFundsForm from "@/form/wallet-form/TransferFundsForm";

const TransferFundsPage = () => {
    return (
        <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col justify-between items-center gap-8">
                <h1 className="font-bold text-2xl">Transfer Funds</h1>
                <p className="opacity-80">You can transfer funds to your friends or co-workers</p>
            </div>
            <div>
                <TransferFundsForm type="TRANSFER" submitTxt="Transfer Now"/>
            </div>
        </div>
    )
}


export default TransferFundsPage;