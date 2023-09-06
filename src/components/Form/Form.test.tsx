import { fireEvent, render, screen } from "@testing-library/react";
import { Form } from "./Form";
import { WithProvider } from "@test/withProvider";

describe("Form render", () => {
  render(WithProvider(<Form />));

  const input = screen.queryByTestId("input") as HTMLInputElement;
  const form = screen.queryByTestId("form") as HTMLFormElement;

  test("Should render form", () => {
    expect(form).toBeInTheDocument();
  });

  test("Should change input value", () => {
    fireEvent.change(input, { target: { value: "Test" } });
    expect(input.value).toBe("Test");
  });
});
