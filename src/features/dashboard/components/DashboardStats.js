import {Link} from "react-router-dom";
function DashboardStats({title, icon, value,link}){
    return(
        <Link to={link} className="stats shadow cursor-pointer hover:bg-base-300">
            <div className="stat">
                <div className={`stat-figure dark:text-slate-300 `}>{icon}</div>
                <div className="stat-title dark:text-slate-300">{title}</div>
                <div className={`stat-value dark:text-slate-300`}>{value !==undefined ? value : <span className="btn btn-ghost loading"/>}</div>
            </div>
        </Link>
    )
}

export default DashboardStats