import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "../../../../model";
import { ITemplateComponent } from "../tmpl.component";
import { getNumberParamFromTemplateRow, getStringParamFromTemplateRow } from "../../../../utils";

@Component({
  selector: "plh-tmpl-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"]
})
export class SliderComponent implements ITemplateComponent, OnInit {

  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: string };
  help: string | null;
  minValue: number = 0;
  maxValue: number = 7;
  disabled: boolean = false;
  title: string | null;
  step: number = 1;
  value: number | null;
  min_value_label: string | null;
  max_value_label: string | null;
  listNumbers: Array<number> = [];
  noAnswer: boolean = false;

  constructor() {
  }

  ngOnInit() {
    this.getParams();
    this.createListNumber(this.minValue, this.maxValue, this.step);
  }

  getParams() {
    this.help = getStringParamFromTemplateRow(this.row, "help", null);
    this.minValue = getNumberParamFromTemplateRow(this.row, "min", this.minValue);
    this.maxValue = getNumberParamFromTemplateRow(this.row, "max", this.maxValue);
    this.title = getStringParamFromTemplateRow(this.row, "title", null);
    this.step = getNumberParamFromTemplateRow(this.row, "step", this.step);
    this.min_value_label = getStringParamFromTemplateRow(this.row, "min_value_label", null);
    this.max_value_label = getStringParamFromTemplateRow(this.row, "max_value_label", null);
    this.value = this.row.value > this.maxValue ? 0 : this.row.value;
    this.disabled = this.value === null;
  }

  createListNumber(min, max, step): Array<number> {
    const arr = [];
    for (let i = min; i <= max; i++) {
      if (i % step === 0) {
        arr.push(i);
      }
    }
    switch (true) {
      case (arr.length <= 11):
        return this.listNumbers = arr;
      case (arr.length > 11 && arr.length <= 16):
        this.listNumbers = arr.filter(item => step > 3 ? item % step === 0 : item % 6 === 0);
        return this.listNumbers;
      case (arr.length > 16 && max < 21):
        this.listNumbers = arr.filter(item => step === 1 ? item % 2 === 0 : item % step === 0);
        return this.listNumbers;
      case (arr.length > 12 && max > 15):
        this.listNumbers = helpArray(min, max);
        return this.listNumbers;
    }

    function helpArray(from, to) {
      const data = [];
      for (let i = from; i < to; i++) {
        if (i % 10 === 0) {
          data.push(i);
        }
      }
      if (to - data[data.length - 1] < 5) {
        data[data.length - 1] = to;
      } else {
        data.push(to);
      }
      return data;
    }
  }

  disableSlider() {
    this.disabled = !this.disabled;
    this.noAnswer = !this.disabled;
  }

}
