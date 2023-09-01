<template>
    <div>
        <button @click="convertToDocx">Convert to DOCX</button>
    </div>
</template>

<script>
import { htmlToDocx } from 'html-to-docx';

export default {
    methods: {
        convertToDocx() {
            const htmlString = '<p>This is an example HTML content.</p>';
            const docxBuffer = htmlToDocx(htmlString);

            // Save the generated DOCX file
            const blob = new Blob([docxBuffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'output.docx';
            link.click();
            window.URL.revokeObjectURL(url);
        }
    }
};
</script>
