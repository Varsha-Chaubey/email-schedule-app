import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DEV: boolean = false;
const SERVER_URL ="https://email-scheduler-g3kn.onrender.com/schedules/"
const BASE_URL: string = DEV ? "http://localhost:8000/schedules/" : SERVER_URL;

interface FetchHelperOptions {
  url: string;
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

// Fetch helper function
const fetchHelper = async ({
  url,
  method = "GET",
  body = null,
  headers = {},
}: FetchHelperOptions): Promise<any> => {
  try {
    const fullUrl: string = `${BASE_URL}${url}`;

    const response = await fetch(fullUrl, {
      method,
     
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData?.msg || "Something went wrong");
      throw new Error(errorData?.msg || "Error in API request");
    }

    const data = await response.json();
    return data;
  } catch (error:any) {
    console.error("Error in fetchHelper:", error.message);
    // throw error;
  }
};

export default fetchHelper;
