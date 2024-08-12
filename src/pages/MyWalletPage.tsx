import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Banknote, CreditCard, HandCoins, Handshake, Landmark, QrCode, Smartphone, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetMyUser } from "@/api/MyUserApi";
import { useGetMyTransaction } from "@/api/MyTransactionApi";
import { useGetMyWallet } from "@/api/MyWalletApi";
const MyWalletPage = () => {

    const { transactions, isLoading: transactionIsLoading } = useGetMyTransaction()
    const { currentUser, isLoading } = useGetMyUser()
    const { wallet, isLoading: walletIsLoading } = useGetMyWallet()

    if (isLoading || transactionIsLoading || walletIsLoading) {
        return "Loading...."
    }

    if (!currentUser || !transactions) {
        return "User not found"
    }

    const myLastTransaction = transactions[0]?.createdAt as any

    return (
        <Card className="flex flex-col gap-2">
            <CardHeader>
                <div className="flex flex-col p-5 gap-10 rounded-lg text-gray-900">
                    <CardTitle className=" font-bold text-3xl">
                        Wallet
                    </CardTitle>
                    <div className="flex flex-col gap-10 justify-between ">
                        <div className="flex flex-col gap-12">
                            <h2 className="flex flex-col text-2xl font-bold">
                                <span className=" flex gap-2 items- justify-between tracking-widest">
                                   Balance <Wallet size={30} />
                                </span>
                                <span>
                                    $ {wallet?.balance.toFixed(2).replace('.', ',')}
                                </span>
                            </h2>
                            <p className="italic flex flex-col">
                                <span>Last Transaction</span>
                                <span className="opacity-50">{myLastTransaction || 'No transactions yet'}</span>
                            </p>
                            
                        </div>
                        <div>
                            <Link to={"/"} className="bg-gray-200 flex items-center justify-center rounded-lg p-3 gap-2">
                                <span><CreditCard className="text-gray-900" size={30} /></span>
                                <span className="tracking  font-bold text-gray-900 text-2xl">Cards</span>
                            </Link>
                        </div>
                    </div>
                    
                </div>

            </CardHeader>
            <CardContent className="flex flex-col gap-12">
                <Carousel>
                    <CarouselContent className="font-medium text-center">
                        <CarouselItem className="basis-1/3 flex flex-col items-center">
                            <Link to={"/add-funds"} className="flex flex-col items-center">
                                <span className="w-14 h-14 flex flex-col items-center justify-center rounded-full bg-gray-200">
                                    <Landmark />
                                </span>
                                <span>
                                    Add Funds
                                </span>
                            </Link>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 flex flex-col items-center">
                            <Link to={"/withdraw-funds"} className="flex flex-col items-center">
                                <span className="w-14 h-14 flex flex-col items-center justify-center rounded-full bg-gray-200">
                                    <HandCoins />
                                </span>
                                <span>
                                    Withdraw Funds
                                </span>
                            </Link>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 flex flex-col items-center">
                            <Link to={"/transfer-funds"} className="flex flex-col items-center">
                                <span className="w-14 h-14 flex flex-col items-center justify-center rounded-full bg-gray-200" >
                                    <Handshake />
                                </span>
                                <span>
                                    Transfer Funds
                                </span>
                            </Link>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 flex flex-col items-center">
                            <Link to={"/"} className="flex flex-col items-center">
                                <span className="w-14 h-14 flex flex-col items-center justify-center rounded-full bg-gray-200">
                                    <Smartphone />
                                </span>
                                <span>
                                    Recharge
                                </span>
                            </Link>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 flex flex-col items-center">
                            <Link to={"/"} className="flex flex-col items-center">
                                <span className="w-14 h-14 flex flex-col items-center justify-center rounded-full bg-gray-200">
                                    <Banknote />
                                </span>
                                <span>
                                    Demands
                                </span>
                            </Link>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 flex flex-col items-center">
                            <Link to={"/"} className="flex flex-col items-center">

                                <span className="w-14 h-14 flex flex-col items-center justify-center rounded-full bg-gray-200">
                                    <QrCode />
                                </span>
                                <span>
                                    QrCode
                                </span>
                            </Link>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
                <div className="flex flex-col items-center gap-5">
                    <div>
                        <h1 className="font-bold text-2xl text-emerald-600">History Of Transactions</h1>
                    </div>
                    <div className="overflow-x-auto max-w-full">
                        <Table>
                            {
                                transactions.length === 0 ? (
                                    <TableCaption>You Don't have transactions yet</TableCaption>
                                ) : (
                                    <TableCaption>Table of Transactions</TableCaption>
                                )
                            }
                            <TableHeader >
                                <TableRow className="text-center ">
                                    <TableHead>IDT</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Method</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Currency</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Direction</TableHead> 
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    transactions && transactions.map((transaction, index) => (
                                        <TableRow key={index} className="text-center">
                                            <TableCell>{transaction.id.slice(-4).toLocaleUpperCase()}</TableCell>
                                            <TableCell className="text-emerald-600 font-bold">{transaction.status}</TableCell>
                                            <TableCell>{transaction.method}</TableCell>
                                            <TableCell>$ {transaction.amount}</TableCell>
                                            <TableCell>{transaction.currency}</TableCell>
                                            <TableCell>{transaction.transactionType}</TableCell>
                                            <TableCell className="text-emerald-600 font-bold">{transaction.direction === 'INBOUND' ? 'Receive' : 'Sent'}</TableCell>
                                        </TableRow>
                                    ))
                                }

                            </TableBody>
                        </Table>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}



export default MyWalletPage;



