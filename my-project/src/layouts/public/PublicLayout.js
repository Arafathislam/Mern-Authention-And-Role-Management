import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
	return (
		<>
		<Outlet />
			{/* <Footer /> */}
		</>
	);
};

export default PublicLayout;
