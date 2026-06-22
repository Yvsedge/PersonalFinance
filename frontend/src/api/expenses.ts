import {authHeader} from './authHeader'
import type{DashboardResponse, DExpenditure, MExpenditure} from '../types/ApiType'


export const fetchDashboardExpenses = async (): Promise<DashboardResponse> => {
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/expenses/dashboard`,
        {
            headers: {
                ...authHeader()
            }
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch");
    }

    return res.json();
};

export const fetchDailyExpenses = async () : Promise<DExpenditure> => {
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/expenses/analytics/daily`,
            {
            headers: {
                ...authHeader()
            }
        }
    );

    if(!res.ok){
        throw new Error('Fetch to fetch');
    }

    return res.json();
}

export const fetchMonthlyExpenses = async () : Promise<MExpenditure> => {
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/expenses/analytics/monthly`,
            {
            headers: {
                ...authHeader()
            }
        }
    );

    if(!res.ok){
        throw new Error('Fetch to fetch');
    }

    return res.json();
}
