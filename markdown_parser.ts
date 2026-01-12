// MarkdownParser.ts
// This file contains the streaming markdown parser implementation

export class MarkdownParser {
  private container: HTMLElement;
  private currentElement: HTMLElement | null = null;
  private buffer: string = '';
  private state: 'normal' | 'inline_code' | 'code_block' = 'normal';
  private backtickCount: number = 0;
  private codeBlockLanguage: string = '';

  constructor(container: HTMLElement) {
    this.container = container;
  }

  /**
   * Process a chunk of markdown text as it streams in.
   * This method is called repeatedly with new chunks of text.
   * 
   * @param chunk - A new piece of markdown text to process
   */
  processChunk(chunk: string): void {
    // TODO: Implement your streaming parser here!
    // 
    // Requirements:
    // 1. Handle inline code blocks (single backticks: `code`)
    // 2. Handle code blocks (triple backticks: ```code```)
    // 3. Be optimistic - style elements as soon as you detect them
    // 4. Don't replace the entire DOM - append/modify incrementally
    //
    // Hints:
    // - You'll need to track state (are we in a code block? inline code?)
    // - Chunks can split backticks (e.g., "``" then "`")
    // - A single chunk can have multiple transitions
    // - Use this.createAndAppendElement() to add styled elements
    // - Use this.appendTextToCurrentElement() to add text to elements

    // Starter code (replace this with your implementation):
    this.appendTextToCurrentElement(chunk);
  }

  /**
   * Helper method to create a new HTML element and append it to the container
   */
  private createAndAppendElement(tagName: string, className?: string): HTMLElement {
    const element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    this.container.appendChild(element);
    this.currentElement = element;
    return element;
  }

  /**
   * Helper method to append text to the current element
   * Creates a new span element if there's no current element
   */
  private appendTextToCurrentElement(text: string): void {
    if (!this.currentElement) {
      this.currentElement = this.createAndAppendElement('span');
    }
    this.currentElement.textContent += text;
  }

  /**
   * Reset the parser state (useful for testing)
   */
  reset(): void {
    this.container.innerHTML = '';
    this.currentElement = null;
    this.buffer = '';
    this.state = 'normal';
    this.backtickCount = 0;
    this.codeBlockLanguage = '';
  }
}