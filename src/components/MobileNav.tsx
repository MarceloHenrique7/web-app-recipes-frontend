import { CircleUserRound, Menu} from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet';
import { useAuth0 } from '@auth0/auth0-react';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import MobileNavLinks from './MobileNavLinks';

const MobileNav = () => {

    const { loginWithRedirect, isAuthenticated, user } = useAuth0()

  return (
    <Sheet>
        <SheetTrigger>
            <Menu className='text-emerald-900'/>
        </SheetTrigger>
        <SheetContent className='space-y-3'>
            <SheetTitle>
                {isAuthenticated ? (
                    <span className='flex items-center font-bold gap-2'>
                        <CircleUserRound />
                        {user?.email}
                    </span>
                ) : (
                    <span>
                        Make Log In for started the sell
                    </span>
                )
                }
            </SheetTitle>
            <Separator/>
            <SheetDescription className='flex flex-col gap-4'>
                {isAuthenticated ? (
                    <MobileNavLinks />
                ) : (
                    <Button onClick={async () => loginWithRedirect()} className='flex-1 font-bold bg-green-500'>
                        Log In
                    </Button>
                )}
            </SheetDescription>
        </SheetContent>
    </Sheet>
  )
}

export default MobileNav;