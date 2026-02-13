import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  imports: [FormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {

  public calculationResult: string = '0'


  public GetNumber(number: string): void {

    this.ClearCalculationResult();

    this.calculationResult += number;
    console.log(number);

  }


  public GetOperation(operation: string): string {

    this.calculationResult += operation;
    return operation;

  }


  private DoOperation(): void {

  }


  public Clear() {
    this.calculationResult = "0";
  }


  public ClearCalculationResult(): void {

    let input = this.calculationResult;
    if (input === "0")
      this.calculationResult = '';

  }

}
