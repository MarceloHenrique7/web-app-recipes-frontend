import WalletFundsForm from "@/form/wallet-form/FundsForm"

const AddFundsPage = () => {

    return (
        <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col justify-between items-center gap-8">
                <h1 className="font-bold text-2xl">Add Funds</h1>
                <p className="opacity-80">You can add funds to your wallet</p>
            </div>
            <div>
                <WalletFundsForm type="DEPOSIT" submitTxt="Add Funds"/>
            </div>
        </div>

    )
}


export default AddFundsPage

