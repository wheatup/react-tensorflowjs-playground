import { useEffect, useState } from "react"


export const useAsync = (fn, deps = []) => {
	const [ready, setReady] = useState(false);
	useEffect(() => {
		fn().then(() => setReady(true));
	}, deps);

	return ready;
}