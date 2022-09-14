import { Component, OnInit } from "@angular/core";
import { ThemeService } from "../../services/theme.service";

@Component({
  selector: "plh-theme-editor-page",
  templateUrl: "./theme-editor.page.html",
  styleUrls: ["./theme-editor.page.scss"],
})
export class ThemeEditorPage implements OnInit {
  availableThemes: string[];
  currentTheme: string;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.availableThemes = this.themeService.getAllThemes();
    this.themeService.currentTheme$.subscribe((currentTheme) => (this.currentTheme = currentTheme));
  }

  setTheme(theme: string) {
    this.themeService.setTheme(theme);
  }
}
