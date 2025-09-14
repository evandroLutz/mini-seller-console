import { JSX, useEffect, useState } from "react";
import { useLeads } from "../../contexts/LeadContext";

function SortBy(): JSX.Element {
    const [ cresc, setCresc ] = useState(false);
    const { leads, setLeads } = useLeads();

    useEffect(() => {
        const sortedLeads = [...leads].sort((a, b) => cresc ? a.score - b.score : b.score - a.score);
        setLeads(sortedLeads);
        console.log('carregou');
    }, [cresc]);


    return (<div className="cursor-pointer" onClick={() => setCresc(!cresc)}>Sort By Score { cresc ? "▲" : "▼" }</div>);
}

export default SortBy;