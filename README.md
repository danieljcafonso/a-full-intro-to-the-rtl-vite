# Testing Workshop

Here we have an application that applies some of the patterns we might encounter in our day to day. Authentication (a simplified version of it), data fetching, data mutations, routing and more.

In this application we can do the following:

1. Create cars (`AddCars.jsx`)
2. View cars (`CarsList.jsx`)
3. Delete cars (`CarsList.jsx`)
4. Login/Register (`Login.jsx` and `Register.jsx`)
5. Toggle Theme (`Header.jsx`)

## Getting started

Clone this repository (or fork it), check in to the branch `feat/start_here`, and install all dependencies by running:

```
npm i
# or
yarn
# or
pnpm i
```

To run the app, run the development server:

```
npm dev
# or
yarn dev
# or
pnpm dev

```

Open [http://localhost:5173](http://localhost:5173/) in your browser to see the page. On your first time using the app, you need to create an account using a username and an email. These are just dummy things to have the functionality in the app.

You should now be able to use the application. Let’s get ready to start testing it.

## Exercise 1

Let us start with the most classic test to reproduce with the React Testing Library. The render one. For this scenario, we will be using our `LandingPage.jsx`.

Look at how that component renders in your browser. From it, do the following:

1. Identify all the elements that exist on the page
2. Create a test file for that component
3. Leveraging rendering, queries, and a jest DOM assertion validate that all the elements are rendered on the page.

<details>

<summary> See solution </summary>

<p>

```jsx
import { render } from "../../utils/test-utils";
import LandingPage from "../LandingPage";

describe("LandingPage tests", () => {
  it("should render page", () => {
    const { getByText, getByRole, getByAltText } = render(<LandingPage />);

    const landingPageText = getByText(
      "A Full Intro to the React Testing Library"
    );
    const landingPageButton = getByRole("button", {
      name: "Here is a button to query",
    });
    const landingPageImageTL = getByAltText("octopus");
    const landingPageImageRTL = getByAltText("goat");

    expect(landingPageText).toBeInTheDocument();
    expect(landingPageButton).toBeInTheDocument();
    expect(landingPageImageTL).toBeInTheDocument();
    expect(landingPageImageRTL).toBeInTheDocument();
  });
});
```

</p>

</details>
