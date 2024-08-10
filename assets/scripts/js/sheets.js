document.addEventListener('DOMContentLoaded', () => {
    const TITLE_COLUMN = 0;
    const LINK_COLUMN = 1;
    const DESCRIPTION_COLUMN = 2;
    const IMAGE_COLUMN = 3;
    const SHOW_COLUMN = 4;
    const CENTER_TEXT_COLUMN = 5;
    const PADDING_LEFT_COLUMN = 6;
    const IMAGE_HEIGHT_COLUMN = 7;
    const IMAGE_WIDTH_COLUMN = 8;
    const PADDING_COLUMN = 9;
    const VERTICAL_LAYOUT_COLUMN = 10;

    const SPREADSHEET_ID = '1c2LVY3M4CwtR0AYsdukq8V1mPiN5rLNVWo8MOUNR1Ds';
    const SHEET_ID = '1440147431';

    function csvToMatrix(csvString) {
        let rows = csvString.trim().split('\n').filter(row => row.trim() !== '');
        let matrix = [];
        for (let row of rows) {
            let cells = [];
            let inQuotes = false;
            let cell = '';
            for (let char of row) {
                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    cells.push(cell.trim());
                    cell = '';
                } else {
                    cell += char;
                }
            }
            cells.push(cell.trim());
            matrix.push(cells);
        }

        // Remove empty columns
        let maxRowLength = matrix.reduce((max, row) => Math.max(max, row.length), 0);
        let columnNotEmpty = Array(maxRowLength).fill(false);
        matrix.forEach(row => {
            row.forEach((cell, index) => {
                if (cell.trim()) columnNotEmpty[index] = true;
            });
        });
        matrix = matrix.map(row => row.filter((cell, index) => columnNotEmpty[index]));

        return matrix;
    }

    function matrixToHtml(matrix) {
        let headers = matrix.shift(); // Remove the header row
        let container = document.createElement('div');

        matrix.forEach(row => {
            if (row[SHOW_COLUMN].toLowerCase() === 'true') { // Check if the show column is true
                let card;
                if (row[LINK_COLUMN]) { // If there is a link
                    card = document.createElement('a');
                    card.href = row[LINK_COLUMN]; // Link URL
                    card.target = '_blank'; // Open in a new tab
                    card.className = 'link-card';
                } else {
                    card = document.createElement('div');
                    card.className = 'link-card no-link';
                }

                if (row[IMAGE_COLUMN]) { // Image link
                    let img = document.createElement('img');
                    img.src = row[IMAGE_COLUMN];
                    if (row[IMAGE_HEIGHT_COLUMN]) img.style.height = row[IMAGE_HEIGHT_COLUMN] || 'auto';
                    if (row[IMAGE_WIDTH_COLUMN]) img.style.width = row[IMAGE_WIDTH_COLUMN] || 'auto';
                    card.appendChild(img);
                }

                let content = document.createElement('div');
                content.className = 'content';

                if (row[CENTER_TEXT_COLUMN].toLowerCase() === 'true') { // Center text if column is true
                    content.style.textAlign = 'center';
                }

                if (row[PADDING_LEFT_COLUMN] && window.innerWidth > 768) { // Add padding-left on larger screens based on column value
                    content.style.paddingLeft = row[PADDING_LEFT_COLUMN];
                }

                if (row[VERTICAL_LAYOUT_COLUMN].toLowerCase() === 'true') { // Stack content vertically if column is true
                    card.classList.add('vertical');
                }

                if (row[PADDING_COLUMN]) { // Add padding (top, right, bottom, left)
                    let paddingValues = row[PADDING_COLUMN].split(' ').map(value => value.trim());
                    if (paddingValues.length === 4) {
                        card.style.padding = `${paddingValues[0]} ${paddingValues[1]} ${paddingValues[2]} ${paddingValues[3]}`;
                    }
                }

                let title = document.createElement('h3');
                title.textContent = row[TITLE_COLUMN];
                content.appendChild(title);

                let description = document.createElement('p');
                description.textContent = row[DESCRIPTION_COLUMN];
                content.appendChild(description);

                card.appendChild(content);
                container.appendChild(card);
            }
        });

        return container;
    }

    function loadPageContent(sheetID, parentElementID) {
        const spreadSheetUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${sheetID}`;

        fetch(spreadSheetUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(csvData => {
                let matrix = csvToMatrix(csvData);
                let content = matrixToHtml(matrix);

                // Append the content to the specified parent element
                document.getElementById(parentElementID).appendChild(content);
            })
            .catch(error => {
                console.error('Error fetching CSV:', error);
            });
    }

    // Load data from your Google Sheets
    loadPageContent(SHEET_ID, 'linksContainer'); // Adjust sheet ID and parent element ID as needed
});
