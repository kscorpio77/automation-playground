# Automation Exercises

These tasks are framework-neutral. Write the automation in your preferred tool; no solutions are included in the playground.

## Beginner

1. Open Input Elements and Controls and enter a value in the normal text box.
2. Fill the first-name and last-name fields using their accessible labels.
3. Read the placeholder and current value from the email field.
4. Clear the pre-populated field and replace its value.
5. Assert that the disabled field cannot be edited and the read-only field is not enabled for typing.
6. Enter fewer than three characters in the required field and inspect the browser validation state.
7. Enter a value in the multiline comments field and verify its value.
8. Click the standard button and verify the visible result.
9. Submit the button demo form and verify its result without navigating away.
10. Reset the button demo form and check that its initial value returns.
11. Double-click the double-click control and verify its confirmation.
12. Right-click the context-menu button and verify the result message.
13. Verify that a disabled button cannot be activated.
14. Select and deselect the single checkbox.
15. Select all independent options and verify the select-all control's checked and indeterminate states.
16. Add a checkbox dynamically, select it, and verify that it has a stable test id.
17. Select each available gender radio option and verify only one in the group is selected.
18. Change the preselected experience radio option and verify the disabled option is unavailable.
19. Choose a value from the native dropdown and verify its selected value.
20. Select multiple automation tools in the multi-select control.
21. Type a country prefix into autocomplete, select a suggestion, and verify the field value.
22. Change country, state, and city in order and verify that dependent options update.
23. Wait for the delayed dropdown options, then select a loaded option.
24. Enter a native date, date of birth, time, and date-time value.
25. Move each range slider with the keyboard and verify its displayed numeric value.
26. Submit the registration form empty and verify the required-field messages.
27. Submit a valid registration and inspect the confirmation summary.
28. Navigate months in the custom calendar, choose a date, and clear it.
29. Follow the internal Home link and verify its destination.
30. Verify image alt text, visibility, and the natural width of the intentionally broken image.

## Intermediate

31. Open the new-tab link and verify the child page's unique heading and window identifier.
32. Verify the mail and telephone links have the expected URL schemes.
33. Trigger the dynamically generated link and follow it.
34. Sort the employee table ascending and descending by name, role, department, and experience.
35. Search the table using mixed-case text from a non-name column.
36. Change the table page size and verify that pagination updates.
37. Select table rows across pages and verify the selected-row count.
38. Edit a table row and remove a row; confirm the displayed data changes.
39. Add a sample table row and locate its deterministic row identifier.
40. Exercise the complex table's rowspan, colspan, link, and button content.
41. Select multiple local files, verify their filenames, and remove a selected file.
42. Try an unsupported or oversized file and verify the validation message.
43. Drag an item between the existing Available and Selected lists.
44. Reorder a task, move a Kanban task to another column, and verify an invalid drop is rejected.
45. Trigger each native alert, confirm, and prompt and verify the resulting message.
46. Open, cancel, confirm, and nest the application modal.
47. Wait for the delayed warning modal and verify the dialog text.
48. Hover and keyboard-focus each tooltip example.
49. Expand and collapse accordion sections while checking `aria-expanded`.
50. Navigate all tabs using both pointer and arrow keys and verify the active panel.
51. Open the nested navigation menu and activate a submenu link.
52. Trigger each toast and verify its message before it disappears.
53. Press Enter, Escape, Space, arrow keys, and Shift+Tab in the keyboard exercise and inspect the recorded action.
54. Copy the provided text and paste it into the target where browser clipboard permission permits.
55. Open one tab, one named window, and multiple child tabs; return to the parent and close a child.
56. Download the TXT, CSV, JSON, and HTML sample files and verify their names and contents.
57. Generate a text download and activate the delayed download control.
58. Scroll the independent list to load additional records; verify the count increases by ten.
59. Scroll the page to reveal the initially off-screen element, fixed footer, and back-to-top control.
60. Use the mock login with valid credentials, refresh the protected page, then log out.
61. Save and read the mock storage preference; reset it and verify the UI state.

## Advanced

62. Compare the dynamic ID on two reloads while locating the element using its stable test id.
63. Insert, update, and remove a dynamic element; assert its text, accessible name, and changing class.
64. Locate the stale-component card, refresh it, then reacquire the replacement element.
65. Wait for the 2-second element to appear and the 3-second element to disappear without fixed sleeps.
66. Start and observe the skeleton loading state, then verify the loaded content replaces it.
67. Locate and interact with the input and button inside each open Shadow DOM root.
68. Switch into the first iframe, then its nested child frame, return to the parent frame, and interact with the sibling iframe.
69. Load the infinite-scroll list to its deterministic 30-record limit and verify it stops.
70. Search local records using mixed case and special characters, then verify both matching and no-results states.
71. Save and read the preference separately from localStorage and sessionStorage, verify the cookie, then delete all three.
72. Inspect the challenging DOM for duplicate classes, similar labels, changing IDs, and sibling relationships; select each target with an appropriate stable strategy.
73. Open the links and images page and distinguish its deliberate missing resources from normal local assets.
74. Test the responsive navigation and content at desktop, tablet, and mobile viewport sizes.
75. Navigate each page using the keyboard and locate controls using accessible roles and names rather than only test ids.

## End-to-End

76. Complete the mock login journey, verify the protected dashboard, simulate session expiry, and sign in again.
77. Create, search, filter, edit, and delete an employee; accept or cancel the deletion confirmation.
78. Search and filter products, inspect product details, add products to the cart, change quantities, remove an item, and verify the subtotal.
79. Attempt checkout with invalid details, correct the form, place an order, and verify the deterministic confirmation.
80. Run the complete journey twice after clearing site data and confirm that the seeded employee and product fixtures are repeatable.
81. On the Locator Playground, compare a label/accessible-name locator with a positional or changing-class approach to the same fixture.
82. Traverse the relationship challenge DOM and locate the Reject action associated with Request 102.
83. On Broken Elements, verify that the unavailable page, image, and download are explicitly labelled while the unusual text input remains valid.
