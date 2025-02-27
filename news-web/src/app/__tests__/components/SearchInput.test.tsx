import { render, screen, fireEvent } from "@testing-library/react";
import SearchInput from "../../components/SearchInput";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

describe("SearchInput Component", () => {
    let mockPush: jest.Mock;

    beforeEach(() => {
        mockPush = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    });

    it("updates input value when typing", () => {
        render(<SearchInput />);
        const input = screen.getByPlaceholderText("e.g. sports, lifestyle") as HTMLInputElement;

        fireEvent.change(input, { target: { value: "technology" } });

        expect(input.value).toBe("technology");
    });

    it("redirects to search page with query when form is submitted", () => {
        render(<SearchInput />);
        const input = screen.getByPlaceholderText("e.g. sports, lifestyle") as HTMLInputElement;
        const button = screen.getByRole("button");

        fireEvent.change(input, { target: { value: "sports" } });
        fireEvent.click(button); // ✅ Correct way to trigger submission

        expect(mockPush).toHaveBeenCalledWith("/search?q=sports");
    });

    it("redirects to home when form is submitted with empty input", () => {
        render(<SearchInput />);
        const button = screen.getByRole("button");

        fireEvent.click(button); // ✅ Simulate form submission via button click

        expect(mockPush).toHaveBeenCalledWith("/");
    });
});
