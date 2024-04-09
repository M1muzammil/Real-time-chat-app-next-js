import React from 'react'
import Image from "next/image"
import Logo from "../asset/t-talk.png"
const Page = () => {
    return (
        <div>
            <nav className='bg-purple-800 flex items-center justify-between p-1' >
                <Image src={Logo} width={150} />
                <button className="btn btn-success">LogOut</button>
            </nav>
        </div>
    )
}

export default Page
