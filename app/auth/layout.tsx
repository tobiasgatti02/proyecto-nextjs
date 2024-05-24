
export default function AuthLayout( {children}: {
    children: React.ReactNode;
} ){
    return(
        <main className=" bg-[#3B0613] flex justify-center">
            <div className="w-full sm-w-[350px] px-10">
                {children}
            </div>
        </main>
    )
}