export default function Tag({data}: {data: string}) {
    return (
        <div className="bg-black rounded-md text-white text-md px-2 py-1 shadow-md ">
            {data}
        </div>
    )
}