import React, { ReactNode, useEffect, useState } from 'react'
import { BoxArrowLeft, BugFill, ChatFill, ClockHistory, Coin, CurrencyExchange, FileEarmark, FileEarmarkPersonFill, HouseFill, PeopleFill, PersonFill, PersonRolodex, Wallet, WalletFill } from 'react-bootstrap-icons'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


function NavBar() {

    const navigator = useNavigate();
    const locator = useLocation();
    const [index, setIndex] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);


    useEffect(() => {
        if (locator.pathname === "/") {
            setIndex(0)
        }


    }, [])





    return (
        <div className="bg-white hidden md:w-1/5 md:py-10 md:px-5 h-full fixed md:flex flex-col ">



            <span className="text-white text-sm">Menu  </span>
            <div className="flex flex-col items-start	hover:cursor-pointer mb-5 mr-20">

                <Link to="/" onClick={() => { setIndex(0); }} className=' w-full'>  <div className={index == 0 ? "flex bg-gray-100  rounded-xl w-full justify-start space-x-5 px-3  py-4 my-2  " : "flex rounded-lg justify-start space-x-5 px-3 py-4 my-2 "}  >
                    <HouseFill color={"gray"} />
                    <span className={index == 0 ? "text-smspace-x-2" : "text-sm text-gray-500"}> Home </span>    </div>
                </Link>

            </div>



        </div>
    )
}

export default NavBar







