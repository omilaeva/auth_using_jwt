import { error } from "@sveltejs/kit";

export const load = ({ locals }) => {
    if (!locals?.user?.roles?.includes("ADMIN")) {
        throw error(401, "Unauthorized.");
    }

    return locals;
};