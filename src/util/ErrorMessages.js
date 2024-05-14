import { toast } from "react-toastify";

export const handleApiError = (error) => {
    if (error.response) {
        const statusCode = error.response.status;
        switch (statusCode) {
            case 400:
                toast.error("Bad request: Invalid data provided.");
                break;
            case 401:
                toast.error("Unauthorized: You are not authorized to perform this action.");
                break;
            case 403:
                toast.error("Forbidden: You do not have permission to access this resource.");
                break;
            case 404:
                toast.error("Not found: The requested resource does not exist.");
                break;
            default:
                toast.error(`An error occurred: ${error.message}`);
        }
    } else if (error.request) {
        toast.error("Network error: No response received from the server.");
    } else {
        toast.error(`An error occurred: ${error.message}`);
    }
};