import { AfterViewInit, Component } from "@angular/core";
import { environment } from "src/environments/environment";
@Component({
  selector: "project-home-banner",
  templateUrl: "./home-banner.component.html",
  styleUrls: ["./home-banner.component.css"],
})
export class HomeBannerComponent {
  public homeImage: string;
  environmentUrl: string = environment.api;
  constructor(
  ) { }
}
