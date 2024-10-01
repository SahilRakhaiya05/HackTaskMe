import { Dialog } from "@headlessui/react";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";
import { toast } from "sonner";
import Loading from "./Loader";
import 'bootstrap/dist/css/bootstrap.min.css';

const ChangePassword = ({ open, setOpen }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const handleOnSubmit = async (data) => {
        if (data.password !== data.cpass) {
            toast.warning("Passwords do not match");
            return;
        }
        try {
            const res = await changePassword(data).unwrap();
            toast.success("Password changed successfully");

            setTimeout(() => {
                setOpen(false);
            }, 1500);
        } catch (error) {
            toast.error("Something went wrong");
            toast.error(error?.data?.message || error.error);
        }
    };

    return (
        <ModalWrapper open={open} setOpen={setOpen}>
            <form onSubmit={handleSubmit(handleOnSubmit)} className="p-4 bg-light rounded shadow">
                <Dialog.Title as="h2" className="text-lg font-bold text-primary mb-4">
                    Change Password
                </Dialog.Title>

                <div className="mb-3">
                    <Textbox
                        placeholder="New Password"
                        type="password"
                        name="password"
                        label="New Password"
                        className="form-control"
                        register={register("password", { required: "New Password is required" })}
                        error={errors.password ? errors.password.message : ""}
                    />
                </div>

                <div className="mb-3">
                    <Textbox
                        placeholder="Confirm Password"
                        type="password"
                        name="cpass"
                        label="Confirm Password"
                        className="form-control"
                        register={register("cpass", { required: "Confirm Password is required" })}
                        error={errors.cpass ? errors.cpass.message : ""}
                    />
                </div>

                {isLoading ? (
                    <div className="py-3 text-center">
                        <Loading />
                    </div>
                ) : (
                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <Button
                            type="submit"
                            className="btn btn-primary"
                            label="Change Password"
                        />
                        <Button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setOpen(false)}
                            label="Cancel"
                        />
                    </div>
                )}
            </form>
        </ModalWrapper>
    );
};

export default ChangePassword;
