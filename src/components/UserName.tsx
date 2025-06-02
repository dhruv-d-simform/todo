import { EditIcon } from '@/assets/EditIcon';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { changeName } from '@/redux/userSlice';
import { validateName } from '@/utils/validations';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useState } from 'react';

export function UserName() {
    const userName = useAppSelector((state) => state.user.name);
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(userName === 'Guest');

    const [userNameInput, setUserNameInput] = useState(userName);
    const [isUserNameInputTouched, setIsUserNameInputTouched] = useState(false);
    const userNameInputError = validateName(userNameInput);
    const isSubmitDisabled = Boolean(userNameInputError);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        dispatch(changeName(userNameInput.trim()));
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="hidden sm:flex justify-center items-center gap-2 text-2xl font-bold p-2 cursor-pointer">
                    <p role="heading">{userName}</p>
                    <button
                        aria-label="Edit User Name"
                        className="cursor-pointer"
                    >
                        <EditIcon />
                    </button>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Change Name</DialogTitle>
                    <DialogDescription className="hidden">
                        Form pop up to change the user's name
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-start gap-4"
                >
                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="change-name" className="text-sm">
                            Name
                        </label>
                        <Input
                            id="change-name"
                            name="change-name"
                            required
                            aria-required
                            type="text"
                            value={userNameInput}
                            onChange={(e) => {
                                setUserNameInput(e.currentTarget.value);
                                setIsUserNameInputTouched(true);
                            }}
                            placeholder="Enter Your Name"
                        />
                        <span className="text-sm text-red-500">
                            {isUserNameInputTouched && userNameInputError}
                        </span>
                    </div>

                    <Button
                        disabled={isSubmitDisabled}
                        className="cursor-pointer"
                    >
                        Submit
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
