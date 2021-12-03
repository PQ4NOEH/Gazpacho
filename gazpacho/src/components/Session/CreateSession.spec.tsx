import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';

import CreateSession from './CreateSession';

let container: HTMLDivElement | null = null;

it("renders the Session", () => {
    const { container } = render(<CreateSession />);
    expect(container.querySelector("input[type='date']")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "client name" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "create session" })).toBeInTheDocument();
});