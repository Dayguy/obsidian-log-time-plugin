# Log Time Plugin for Obsidian 
Create a list with log-like entries that behave similar to the unordered lists you're already familiar with, but with formattable timestamps in place of bullets.
## Features
- Create lists using `-:-` to trigger an unordered (bulleted) list using a timestamp in place of bullet points.
- Customizable date/times using Obsidian format masks found in Day.js library [listed below](#format-masks). 
    - Default format: HH:mm (24-hour two-digit hour:Two-digit minutes)
- Include characters with the mask to get a little fancier. 
    - i.e. using `HH:mm>` as a mask will result in `11:42> This is a log entry.`
- Works like existing bulleted lists, new line starts with date/time, additional new line ends the list.
- To continue a previously ended list, click the end of the last line and press `enter` or `return`.

## Usage
1. Type `-:-` followed by a space.
2. Continue typing the message you wanted date/time stamped.
3. Press `enter` or `return` to start another entry with the current time/date.
4. To end the list press `enter` or `return` again.
5. To return and add additional entries later click the end of the last line and press `enter` or `return`. 

## Installation
The easiest way to install is through the Community plugins section in Obsidian's settings:
1. Start Obsidian
2. Click the gear icon next to your vault name to open Settings.
3. On the left side of resulting Settings window, click `Community plugins`.
4. If necessary click the `Turn on community plugins` button, otherwise skip to the next step.
5. Click `Browse`
6. Search for "Log Time" and click the plugins tile.
7. Click the install button.
8. You should now see it listed on the left-side of the settings window under Community plugins.
9. Adjust the settings to your liking and enjoy.


## Format Masks
### Year Masks
 | Mask | Description | Example Output |
 | :--- | :--------- | -------------: |
 | YYYY | Full year | 2025 |
 | YY   | Two-digit year | 25 |
### Month Masks
 | Mask | Description | Example Output |
 | :--- | :--------- | -------------: |
 | MMMM | Full month name | September|
 | MMM  | Abbreviated month name | Sep |
 | MM   | Two-digit month | 09 |
 | M    | Single-digit month | 9 |
### Day Masks
 | Mask | Description | Example Output |
 | :--- | :--------- | -------------: |
 | DD   | Two-digit day of the month | 09 |
 | D    | Single-digit day of the month | 9 |
 | dddd | Full day of the week | Tuesday |
 | ddd  | Abbreviated day name | Tue |
 | dd   | Two-letter day of the week | Tu |
 | d    | Single-digit day of the week | 0 for Sunday through 6 for Saturday|
### Hour Masks
 | Mask | Description | Example Output |
 | :--- | :--------- | -------------: |
 | HH   | 24-hour two-digit hour | 18 |
 | H    | 24-hour single-digit hour | 6 |
 | hh   | 12-hour two-digit hour | 06 |
 | h    | 12-hour single-digit hour | 6 |
### Minute Masks
 | Mask | Description | Example Output |
 | :--- | :--------- | -------------: |
 | mm   | Two-digit minute | 09 |
 | m    | Single-digit minute | 9 |
### Seconds Masks
| Mask | Description | Example Output |
| :--- | :--------- | -------------: |
| ss   | Two-digit seconds | 05 |
| s    | Single-digit seconds | 5 |
### AM/PM
| Mask | Description | Example Output |
| :--- | :--------- | -------------: |
| A    | Uppercase AM/PM | PM |
| a    | Lowercase am/pm | pm |