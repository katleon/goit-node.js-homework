import User from "../../models/user.js";
import HttpErrorCreator from "../../helpers/HttpErrorCreator.js";
import sendEmail from "../../helpers/sendEmail.js";

export async function verifyEmail(req, res) {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpErrorCreator(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({ message: "Verification successful" });
}

export async function resendVerificationEmail(req, res) {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpErrorCreator(404, "User not found");
  }
  if (user.verify) {
    throw HttpErrorCreator(400, "Verification has already been passed");
  }

  const verifyEmailMessage = {
    to: email,
    subject: "Please, verify your email",
    html: `<a target='_blank' href='http://localhost:3000/api/users/verify/${verificationToken}'>Click here to verify your email</a>`,
  };

  await sendEmail(verifyEmailMessage);

  res.json({ message: "Verification email sent" });
}

export default { verifyEmail, resendVerificationEmail };
