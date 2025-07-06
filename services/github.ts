import axios from "axios";
import type { TypeGithubOrganizationUser } from "../types/github";

export const GetAllOrganizationUsers = async (
    organization: string
): Promise<TypeGithubOrganizationUser[]> => {
    const allUsers: TypeGithubOrganizationUser[] = [];
    let page = 1;
    const perPage = 100;

    while (true) {
        try {
            const response = await axios.get<TypeGithubOrganizationUser[]>(
                `https://api.github.com/orgs/${organization}/members`,
                {
                    params: {
                        per_page: perPage,
                        page,
                    },
                }
            );

            const users = response.data;

            if (!Array.isArray(users) || users.length === 0) {
                break;
            }

            allUsers.push(...users);
            page++;
        } catch (error) {
            console.error(`Failed to fetch page ${page} for ${organization}:`, error);
            page++; // skip and continue with next page
            continue;
        }
    }

    return allUsers;
};


export const GithubService = {
    GetAllOrganizationUsers
}