export const emailValidate = {
    required: {
        value: true,
        message: "enter your email"
    },
    pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "enter your email"
    }
}
export const passwordValidate = {
    required: {
        value: true,
        message: "please enter your password"
    },
    pattern: {
        value: 6,
        message: "Password ..."
    }
}