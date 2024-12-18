import { Link } from "react-router-dom";

function AppBar() {
    return (
        <div className='h-16 flex items-center justify-between px-4 bg-slate-200 text-black '>
            <div>Medium</div>
            <div>
                <Link to='/publish' className='px-4 py-2 bg-slate-300 rounded-md'>Publish</Link>
            </div>
        </div>
    );
}

export default AppBar;