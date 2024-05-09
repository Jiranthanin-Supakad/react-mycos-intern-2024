import { FetchStatus } from "../models/FetchStatus";


export const getIsLoading = (fetchStatus: FetchStatus) =>
	fetchStatus === FetchStatus.LOADING || fetchStatus === FetchStatus.IDLE