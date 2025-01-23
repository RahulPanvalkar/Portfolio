import { Component, OnInit } from '@angular/core';
import { GithubService } from './github.service';
import { PreLoaderService } from 'src/app/services/pre-loader.service';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css'],
})
export class GithubComponent implements OnInit {

  // Variables to store contribution data, grouped weeks, total contributions and month labels.
  contributions: any[] = [];
  weeks: any[] = [];
  totalContributions: number = 0;
  months: { name: string; start: number }[] = []; // Stores month names with their start week.

  username: string = 'RahulPanvalkar'; // Default GitHub username.

  constructor(
    private preLoaderService: PreLoaderService,
    private githubService: GithubService
  ) { }

  ngOnInit(): void {
    // Load contribution data on initialization
    this.loadContributions(this.username);
  }

  /**
   * Loads GitHub contribution data for the given username.
   * Shows a loader while fetching and processes the data into weeks and months.
   */
  loadContributions(username: string): void {
    this.preLoaderService.show(); // Show loading indicator.
    setTimeout(() => this.preLoaderService.hide(), 10000); // Fallback to hide the loader after 10 seconds.

    this.githubService.getContributions(username).subscribe((data) => {
      this.totalContributions = data.total.lastYear; // Update total contributions.
      this.contributions = data.contributions;
      this.weeks = this.groupContributionsByWeek(data.contributions); // Group contributions into weeks.
      this.months = this.getMonthLabels(); // Generate month labels.
      this.preLoaderService.hide(); // Hide the loader.
    });
  }

  /**
   * Groups contributions into weeks of 7 days each.
   * Remaining days are added as the final week.
   */
  groupContributionsByWeek(contributions: any[]): any[] {
    const weeks: any[] = [];
    let currentWeek: any[] = [];

    contributions.forEach((day, index) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || index === contributions.length - 1) {
        weeks.push({ contributionDays: currentWeek });
        currentWeek = [];
      }
    });

    return weeks;
  }

  /**
   * Determines the intensity level for a contribution count.
   * Returns a level (0 to 4) based on thresholds.
   */
  getContributionLevel(contributionCount: number): number {
    if (contributionCount === 0) return 0;
    if (contributionCount < 2) return 1;
    if (contributionCount < 4) return 2;
    if (contributionCount < 6) return 3;
    return 4;
  }

  /**
   * Generates month labels with their starting week index.
   * Iterates through contributions and identifies month changes.
   */
  getMonthLabels() {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const months: { name: string; start: number }[] = [];
    let currentMonth = -1;

    this.weeks.forEach((week, weekIndex) => {
      week.contributionDays.forEach((day: { date: string | number | Date }) => {
        const month = new Date(day.date).getMonth();
        if (month !== currentMonth) {
          currentMonth = month;
          months.push({ name: monthNames[month], start: weekIndex + 1 });
        }
      });
    });

    if (months && months.length > 12) {
      months.splice(0, 1); // Remove the first extra month.
    }
    return months;
  }

}
