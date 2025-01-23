/**
 * Represents a project with details for display.
 * 
 * Properties:
 * - `imgPath`: Path to the project's image.
 * - `title`: Project name or title.
 * - `description`: Key points describing the project.
 * - `ghLink`: GitHub repository URL.
 * - `demoLink`: (Optional) Live demo URL.
 */
export interface Project {
    readonly imgPath: string;
    readonly title: string;
    readonly description: string[];
    readonly ghLink: string;
    demoLink?: string;
}
