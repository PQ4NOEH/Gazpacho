import { unmountComponentAtNode } from 'react-dom';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { randomString } from '../../utils/stringUtils';

import CreateSession from './CreateSession';

let container: HTMLDivElement | null = null;

describe("Session goals", () => {
    it("renders the Session", () => {
        const { container } = render(<CreateSession />);
        expect(container.querySelector("input[type='date']")).toBeInTheDocument();
        const clientNameInput = screen.getByRole("textbox", { name: "client name" });
        expect(clientNameInput).toBeInTheDocument();
        expect(clientNameInput).toHaveFocus();
        expect(screen.getByRole("button", { name: "create session" })).toBeInTheDocument();
    });
    it("validate empty client name", async () => {
        render(<CreateSession />);
        fireEvent.submit(screen.getByRole("button", { name: "create session" }));
        const clientNameError = await waitFor(() => screen.getByRole("alert", { name: "client name error" }));
        expect(clientNameError.innerHTML).toEqual("Client name is required");
    });
    it("validate client name shorter than 3 characters", async () => {
        render(<CreateSession />);
        fireEvent.input(
            screen.getByRole("textbox", { name: "client name" }),
            { target: { value: randomString(1) } }
        );
        fireEvent.submit(screen.getByRole("button", { name: "create session" }));
        const clientNameError = await waitFor(() => screen.getByRole("alert", { name: "client name error" }));
        expect(clientNameError.innerHTML).toEqual("Client name must have more than 2 characters");
    });
    it("validate client name longer than 50 characters", async () => {
        render(<CreateSession />);
        fireEvent.input(
            screen.getByRole("textbox", { name: "client name" }),
            { target: { value: randomString(51) } }
        );
        fireEvent.submit(screen.getByRole("button", { name: "create session" }));
        const clientNameError = await waitFor(() => screen.getByRole("alert", { name: "client name error" }));
        expect(clientNameError.innerHTML).toEqual("Client name can not have more than 50 characters");
    });
});