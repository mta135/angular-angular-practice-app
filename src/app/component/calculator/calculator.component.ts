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

  firstOperand: number | null = null;
  operator: string = "";
  waitForSecondNumber = false;


  public GetNumber(number: string): void {

    this.ClearCalculationResult();

    if (this.waitForSecondNumber) {

      this.calculationResult = number;
      this.waitForSecondNumber = false;

    }

    else {
      this.calculationResult === '0' ? this.calculationResult = number : this.calculationResult += number;
    }

    console.log(number);
  }


  public GetOperation(operation: string): void {


    if (this.firstOperand === null) {

      this.firstOperand = Number(this.calculationResult);

    } else if (this.operator) {

      const result = this.doCalculation(this.operator, Number(this.calculationResult))
      this.calculationResult = String(result);
      this.firstOperand = result;

    }

    this.operator = operation;
    this.waitForSecondNumber = true;

  }

  private doCalculation(op: any, secondOp: any) {
    switch (op) {
      case '+':
        return this.firstOperand += secondOp;

      case '-':

        return this.firstOperand -= secondOp;
      case '*':

        return this.firstOperand *= secondOp;
      case '/':

        return this.firstOperand /= secondOp;

      case '=':
        return secondOp;
    }
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
