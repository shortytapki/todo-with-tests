import { fireEvent, render, screen } from "@testing-library/react";
import { test } from "vitest";

import { App } from "./App";
import { WithProvider } from "@test/withProvider";

describe("App integration tests", () => {
  test("Should render the app", () => {
    render(WithProvider(<App />));
    const header = screen.queryByText("Todos");
    expect(header).toBeInTheDocument();

    const allTab = screen.queryByText("All");
    expect(allTab).toBeInTheDocument();
  });

  test("Should update ui", () => {
    const { queryByText, queryByTestId } = render(<App />);

    const input = queryByTestId("input") as HTMLInputElement;
    const form = queryByTestId("form") as HTMLFormElement;

    fireEvent.change(input, { target: { value: "Test task" } });
    fireEvent.submit(form);

    const taskHeading = queryByText("Test task") as HTMLHeadingElement;
    expect(taskHeading).toBeInTheDocument();

    const doneContainer = taskHeading.parentNode as HTMLDivElement;
    const checkButton = doneContainer.querySelector("i") as HTMLElement;

    fireEvent.click(checkButton);
    expect(taskHeading).toHaveClass("line-through");

    const deleteButton = doneContainer.parentNode?.children[1] as HTMLElement;
    fireEvent.click(deleteButton);

    expect(taskHeading).not.toBeInTheDocument();
  });
});
