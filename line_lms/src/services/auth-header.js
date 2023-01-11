export default function authHeader() {
	const user = JSON.parse(localStorage.getItem("user"));

	if (!(user && user.accessToken)) {
		return;
	}

	return { "x-access-token": user.accessToken };
}
