import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { color } from "framer-motion";


const styles = {
	loginContainer: {
		width: "100%",
		minHeight: "100vh",
		backgroundColor: "black",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},

	loginFormContainer: {
		color:'black',
		width: "900px",
		height: "500px",
		display: "flex",
		borderRadius: "10px",
		boxShadow: "0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12)",
	},

	left: {
		flex: 2,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
		borderTopLeftRadius: "10px",
		borderBottomLeftRadius: "10px",
	},

	formContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},

	input: {
		outline: "none",
		border: "none",
		width: "370px",
		padding: "15px",
		borderRadius: "10px",
		backgroundColor: "#edf5f3",
		margin: "5px 0",
		fontSize: "14px",
        color:'black',
	},

	errorMsg: {
		width: "370px",
		padding: "15px",
		margin: "5px 0",
		fontSize: "14px",
		backgroundColor: "#f34646",
		color: "white",
		borderRadius: "5px",
		textAlign: "center",
	},

	right: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#c62a36",
		borderTopRightRadius: "10px",
		borderBottomRightRadius: "10px",
		color: "white",
	},

	button: {
		border: "none",
		outline: "none",
		padding: "12px 0",
		borderRadius: "20px",
		width: "180px",
		fontWeight: "bold",
		fontSize: "14px",
		cursor: "pointer",
	},

	greenBtn: {
		backgroundColor: "#c62a36",
		color: "white",
		margin: "10px",
	},

	whiteBtn: {
		backgroundColor: "white",
		color: "black",
	},
};

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:5000/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
            localStorage.setItem("userEmail", res.user?.email); 

			window.location = "/userdash";
		} catch (error) {
			if (error.response && error.response.status >= 400 && error.response.status <= 500) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div style={styles.loginContainer}>
			<div style={styles.loginFormContainer}>
				<div style={styles.left}>
					<form style={styles.formContainer} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input type="email" placeholder="Email" name="email" onChange={handleChange} value={data.email} required style={styles.input} />
						<input type="password" placeholder="Password" name="password" onChange={handleChange} value={data.password} required style={styles.input} />
						{error && <div style={styles.errorMsg}>{error}</div>}
						<button type="submit" style={{ ...styles.button, ...styles.greenBtn }}>
							Sign In
						</button>
					</form>
				</div>
				<div style={styles.right}>
					<h1>New Here?</h1>
					<Link to="/">
						<button type="button" style={{ ...styles.button, ...styles.whiteBtn }}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
