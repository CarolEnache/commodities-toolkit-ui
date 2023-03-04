import { describe, it } from "node:test";
import assert from "node:assert";

import { oecdCoeficients, OECDRawVariables } from "../utils/oecdCoeficients";

describe("oecdCoeficients util", () => {
  const coeficients = oecdCoeficients();

  describe("when returning oecdDirectRequirements", () => {
    it('has total rows equal to domestic rows', () => {
      assert.strictEqual(
        coeficients[OECDRawVariables.TOTAL]?.rows?.length,
        coeficients[OECDRawVariables.DOMESTIC]?.rows?.length
      );
    });
    it("has the right value for Domestic intermediaries", () => {
      assert.strictEqual(
        parseFloat(
          `${coeficients[OECDRawVariables.VALUE_ADDED]?.getValueByName(
            "Domestic intermediates",
            "D01T03"
          ) || 0}`
        ).toFixed(7),
        "0.4177632"
      );
      assert.strictEqual(
        parseFloat(
          `${coeficients[OECDRawVariables.VALUE_ADDED]?.getValueByName(
            "Domestic intermediates",
            "D07T08"
          ) || 0}`
        ).toFixed(7),
        "0.4545871"
      );
      assert.strictEqual(
        parseFloat(
          `${coeficients[OECDRawVariables.VALUE_ADDED]?.getValueByName(
            "Domestic intermediates",
            "D13T15"
          ) || 0}`
        ).toFixed(7),
        "0.6058234"
      );
    });
    // {
    //   VALUE_ADDED: {
    //     D01T03: {
    //       'TXS_INT_FNL': oecdDirectRequirements[OECDRawVariables.VALUE_ADDED].getValueByName('TXS_INT_FNL', 'D01T03'),
    //       'TTL_INT_FNL': oecdDirectRequirements[OECDRawVariables.VALUE_ADDED].getValueByName('TTL_INT_FNL', 'D01T03'),
    //       'Domestic intermediates': oecdDirectRequirements[OECDRawVariables.VALUE_ADDED].getValueByName('Domestic intermediates', 'D01T03'),
    //       'Imported intermediates': oecdDirectRequirements[OECDRawVariables.VALUE_ADDED].getValueByName('Imported intermediates', 'D01T03'),
    //       'Value added': oecdDirectRequirements[OECDRawVariables.VALUE_ADDED].getValueByName('VALU', 'D01T03'),
    //       'Taxes on production': oecdDirectRequirements[OECDRawVariables.VALUE_ADDED].getValueByName('OTXS', 'D01T03'),
    //       'Labour cost': oecdDirectRequirements[OECDRawVariables.VALUE_ADDED].getValueByName('LABR', 'D01T03'),
    //       'Operating surplus, gross': oecdDirectRequirements[OECDRawVariables.VALUE_ADDED].getValueByName('GOPS', 'D01T03'),
    //     },
    //   },
    //   D01T03: {
    //     DOM_01T03: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_01T03', 'D01T03'), 0.15281070],
    //     DOM_05T06: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_05T06', 'D01T03'), 0.00153314],
    //     DOM_07T08: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_07T08', 'D01T03'), 0.00063531],
    //     DOM_09: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_09', 'D01T03'), 0.00322329],
    //     DOM_10T12: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_10T12', 'D01T03'), 0.07258892],
    //     DOM_13T15: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_13T15', 'D01T03'), 0.00246866],
    //     DOM_16: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_16', 'D01T03'), 0.00111496],
    //     DOM_17T18: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_17T18', 'D01T03'), 0.00149865],
    //     DOM_19: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_19', 'D01T03'), 0.02013333],
    //     DOM_20T21: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_20T21', 'D01T03'), 0.02634719],
    //     DOM_22: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_22', 'D01T03'), 0.00273352],
    //     DOM_23: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_23', 'D01T03'), 0.00149588],
    //     DOM_24: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_24', 'D01T03'), 0.00075564],
    //     DOM_25: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_25', 'D01T03'), 0.00265580],
    //   }
    // };
  });
});
