import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Banknote, CreditCard, HandCoins, Handshake, Landmark, QrCode, Smartphone, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetMyUser } from "@/api/MyUserApi";

const MyWalletPage = () => {

    const { currentUser, isLoading } = useGetMyUser()

    if (isLoading) {
        return "Loading...."
    }

    if (!currentUser) {
        return "User not found"
    }


    return (
        <Card className=" flex flex-col gap-2">
            <CardHeader>
                <div className="flex flex-col p-5 gap-10 shadow-lg bg-emerald-900 rounded-lg text-white">
                    <CardTitle className="text-center font-bold text-3xl">
                        Wallet
                    </CardTitle>
                    <div className="flex flex-col gap-10 justify-between ">
                        <div className="flex flex-col gap-12">
                            <h2 className="flex flex-col text-3xl font-bold">
                                <span className=" flex gap-2 items-center tracking-widest">
                                    <Wallet size={30} /> Your Balance 
                                </span>
                                <span>
                                    $ {currentUser.wallet.balance.toFixed(2)}
                                </span>
                            </h2>
                            <p className="italic flex flex-col">
                                <span>Last Transaction</span>
                                <span>02/07/2024</span>
                            </p>
                            
                        </div>
                        <div>
                            <Link to={"/"} className="bg-gray-200 flex items-center justify-center rounded-lg p-3 gap-2">
                                <span><CreditCard className="text-gray-900" size={30} /></span>
                                <span className="tracking  font-bold text-gray-900 text-2xl">My Cards</span>
                            </Link>
                        </div>
                    </div>
                    
                </div>

            </CardHeader>
            <CardContent className="flex flex-col gap-12">
                <Carousel>
                    <CarouselContent className="font-medium text-center">
                        <CarouselItem className="basis-1/3 flex flex-col items-center">
                            <span className="w-14 h-14 flex flex-col items-center justify-center rounded-full bg-gray-200">
                                <Landmark />
                            </span>
                            <span>
                                Add Funds
                            </span>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 flex flex-col items-center">
                            <span className="w-14 h-14 flex flex-col items-center justify-center rounded-full bg-gray-200">
                                <HandCoins />
                            </span>
                            <span>
                                Withdraw Funds
                            </span>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 flex flex-col items-center">
                            <span className="w-14 h-14 flex flex-col items-center justify-center rounded-full bg-gray-200" >
                                <Handshake />
                            </span>
                            <span>
                                Transfer Funds
                            </span>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 flex flex-col items-center">
                            <span className="w-14 h-14 flex flex-col items-center justify-center rounded-full bg-gray-200">
                                <Smartphone />
                            </span>
                            <span>
                                Recharge
                            </span>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 flex flex-col items-center">
                            <span className="w-14 h-14 flex flex-col items-center justify-center rounded-full bg-gray-200">
                                <Banknote />
                            </span>
                            <span>
                                Demands
                            </span>
                        </CarouselItem>
                        <CarouselItem className="basis-1/3 flex flex-col items-center">
                            <span className="w-14 h-14 flex flex-col items-center justify-center rounded-full bg-gray-200">
                                <QrCode />
                            </span>
                            <span>
                                QrCode
                            </span>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
                <div className="flex flex-col items-center gap-5">
                    <div>
                        <h1 className="font-bold text-2xl text-emerald-900">History Of Payments</h1>
                    </div>
                    <div>
                        <Table>
                            <TableCaption>Table of Transactions</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>IDT</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Method</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Currency</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>IFAF23</TableCell>
                                    <TableCell>Paid</TableCell>
                                    <TableCell>Credit Card</TableCell>
                                    <TableCell>$ 200.000</TableCell>
                                    <TableCell>Usd</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}



export default MyWalletPage;



