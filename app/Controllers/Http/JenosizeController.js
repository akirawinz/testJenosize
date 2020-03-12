"use strict";
const CustomException = use("App/Exceptions/CustomException");
// const Config = use("Config");
const Config = use("Config");
const EXP_ABCD = Config.get("calculate.EXP_ABCD");
const EXP_AABC = Config.get("calculate.EXP_AABC");
const EXP_AABB = Config.get("calculate.EXP_AABB");
const EXP_AAAB = Config.get("calculate.EXP_AAAB");
const EXP_AAAA = Config.get("calculate.EXP_AAAA");
const EXP_1ABC = Config.get("calculate.EXP_1ABC");
const EXP_1AAB = Config.get("calculate.EXP_1AAB");
const EXP_1AAA = Config.get("calculate.EXP_1AAA");
const EXP_11AB = Config.get("calculate.EXP_11AB");
const EXP_11AA = Config.get("calculate.EXP_11AA");
const EXP_111A = Config.get("calculate.EXP_111A");
const EXP_22AB = Config.get("calculate.EXP_22AB");
const EXP_22AA = Config.get("calculate.EXP_22AA");
const EXP_222A = Config.get("calculate.EXP_222A");
const EXP_122A = Config.get("calculate.EXP_122A");
const EXP_2AAB = Config.get("calculate.EXP_2AAB");
const EXP_AB = Config.get("calculate.EXP_AB");
const EXP_AA = Config.get("calculate.EXP_AA");

class JenosizeController {
  async test({ request, response }) {
    const { data } = request.all();
    await this.validateInput(data);
    const getData = await this.solve(data);
    const length = getData.length;
    if (length == 0) {
      throw new CustomException("No ไม่มีวิธีไหนหาค่าได้ ", 403);
    }
    return response.status(200).json({
      status: 200,
      success: true,
      message: "Yes สามารถค่าค่าได้ " + length + " วิธี",
      data: getData
    });
  }

  async solve(ns) {
    ns.sort(function(a, b) {
      return a - b;
    });
    var n0 = ns[0];
    var n1 = ns[1];
    var n2 = ns[2];
    var n3 = ns[3];
    if (n0 == n1) {
      if (n1 == n2) {
        if (n2 == n3) {
          // n0 = n1 = n2 = n3, 3333
          return await this.solve4(EXP_AAAA, n0);
        }
        // n0 = n1 = n2 < n3
        if (n0 == 1) {
          // 111Q
          return await this.solve4(EXP_111A, n3);
        }
        if (n0 == 2) {
          // 2228
          return await this.solve4(EXP_222A, n3);
        }
        // 3335
        var result = await this.solve4(EXP_AAAB, n0, n3);
        if (n3 - n0 == 1) {
          // 3334
          return await this.append(
            await this.filter(result, n3, n0),
            EXP_AA,
            n0,
            0,
            n3,
            n0
          );
        }
        return result;
      }
      if (n2 == n3) {
        // n0 = n1 < n2 = n3
        if (n0 == 1) {
          // 1155
          return await this.solve4(EXP_11AA, n2);
        }
        if (n0 == 2) {
          // 2233
          return await this.solve4(EXP_22AA, n2);
        }
        // 3355
        var result = await this.solve4(EXP_AABB, n2, n0);
        if (n2 - n1 == 1) {
          // 4455
          return await this.append(
            await this.filter(result, n2, n0),
            EXP_AB,
            n2,
            n0,
            n3,
            n0
          );
        }
        return result;
      }
      // n0 = n1 < n2 < n3
      if (n0 == 1) {
        // 1145
        return await this.solve4(EXP_11AB, n3, n2);
      }
      if (n0 == 2) {
        // 2245
        var result = await this.solve4(EXP_22AB, n3, n2);
        if (n2 == 3) {
          // 223Q
          return await this.append(
            await this.filter(result, 3, 2),
            EXP_AB,
            n3,
            2,
            3,
            2
          );
        }
        return result;
      }
      // 3356
      var result = await this.solve4(EXP_AABC, n0, n3, n2);
      if (n2 - n0 == 1) {
        // 3348
        return await this.append(
          await this.filter(result, n2, n0),
          EXP_AB,
          n3,
          n0,
          n2,
          n0
        );
      }
      // n3 - n2 == 1 && n0 + n0 == 24 is impossible
      return result;
    }
    if (n1 == n2) {
      if (n2 == n3) {
        // n0 < n1 = n2 = n3
        if (n0 == 1) {
          // 1888
          return await this.solve4(EXP_1AAA, n1);
        }
        // 2333
        return await this.solve4(EXP_AAAB, n1, n0);
      }
      // n0 < n1 = n2 < n3
      if (n0 == 1) {
        if (n1 == 2) {
          // 1226
          return await this.solve4(EXP_122A, n3);
        }
        // 1334
        return await this.solve4(EXP_1AAB, n1, n3);
      }
      if (n0 == 2) {
        // 2668
        var result = await this.solve4(EXP_2AAB, n1, n3);
        var result2 = [];
        if (n1 == 3) {
          // 2338
          result = await this.filter(result, 3, 2);
          await this.append(result2, EXP_AB, n3, 3, 3, 2);
        }
        if (n3 - n1 == 1) {
          // 2QQK
          result = await this.filter(result, n3, n1);
          await this.append(result2, EXP_AB, n1, 2, n3, n1);
        }
        // 2334
        return result.concat(result2);
      }
      // 3669
      var result = await this.solve4(EXP_AABC, n1, n3, n0);
      var result2 = [];
      if (n1 - n0 == 1) {
        // 3446
        result = await this.filter(result, n1, n0);
        await this.append(result2, EXP_AB, n3, 1, n1, n0);
      }
      if (n3 - n1 == 1) {
        // 4667
        result = await this.filter(result, n3, n1);
        await this.append(result2, EXP_AB, n1, 0, n3, n1);
      }
      // 5667
      return result.concat(result2);
    }
    if (n2 == n3) {
      // n0 < n1 < n2 = n3
      if (n0 == 1) {
        // 1366
        var result = await this.solve4(EXP_1AAB, n3, n1);
        if (n1 == 2) {
          // 12QQ
          return await this.append(
            await this.filter(result, 2, 1),
            EXP_AA,
            n2,
            0,
            2,
            1
          );
        }
        return result;
      }
      if (n0 == 2) {
        // 2466
        var result = await this.solve4(EXP_2AAB, n3, n1);
        var result2 = [];
        if (n1 == 3) {
          // 23QQ
          result = await this.filter(result, 3, 2);
          await this.append(result2, EXP_AA, n2, 0, 3, 2);
        }
        if (n2 - n1 == 1) {
          // 2JQQ
          result = await this.filter(result, n2, n1);
          await this.append(result2, EXP_AB, n2, 2, n2, n1);
        }
        // 2344
        return result.concat(result2);
      }
      // 4688
      var result = await this.solve4(EXP_AABC, n2, n1, n0);
      var result2 = [];
      if (n1 - n0 == 1) {
        // 34QQ
        result = await this.filter(result, n1, n0);
        await this.append(result2, EXP_AA, n2, 0, n1, n0);
      }
      if (n2 - n1 == 1) {
        // 3788
        result = await this.filter(result, n2, n1);
        await this.append(result2, EXP_AB, n2, n0, n2, n1);
      }
      // JQKK
      return result.concat(result2);
    }
    // n0 < n1 < n2 < n3
    if (n0 == 1) {
      // 1468
      var result = await this.solve4(EXP_1ABC, n3, n2, n1);
      if (n1 == 2) {
        // 1238
        return await this.append(
          await this.filter(result, 2, 1),
          EXP_AB,
          n3,
          n2,
          2,
          1
        );
      }
      return result;
    }
    // 246Q
    var result = await this.solve4(EXP_ABCD, n3, n2, n1, n0);
    var result2 = [];
    if (n1 - n0 == 1) {
      // 34JK
      result = await this.filter(result, n1, n0);
      await this.append(result2, EXP_AB, n3, n2, n1, n0);
    }
    if (n2 - n1 == 1) {
      // 3568
      result = await this.filter(result, n2, n1);
      await this.append(result2, EXP_AB, n3, n0, n2, n1);
    }
    if (n3 - n2 == 1) {
      // 46910
      result = await this.filter(result, n3, n2);
      await this.append(result2, EXP_AB, n1, n0, n3, n2);
    }
    // 3458,38910,2378,5678
    return result.concat(result2);
  }

  async validateInput(data) {
    if (data[0] == 0 || data[1] == 0 || data[2] == 0 || data[3] == 0) {
      throw new CustomException("เกิดข้อผิดพลาดกรุณา อย่าใส่ เลข 0 ", 403);
    }
    const checkNumbericInput = await this.checkNumbericInput(data);
    if (!checkNumbericInput) {
      throw new CustomException("กรุณาใส่ตัวเลข 0 - 9 ", 403);
    }
    return true;
  }

  async checkNumbericInput(arr) {
    let isGreaterThanZero = number => number > 0;
    let isLessThanOrEqualNine = number => number <= 9;
    let allPositive = arr.every(
      num => isGreaterThanZero(num) && isLessThanOrEqualNine(num)
    );
    // console.log(allPositive);
    return allPositive;
  }

  async solve4(expressions, na, nb, nc, nd) {
    var solutions = [];
    for (var i = 0; i < expressions.length; i++) {
      var value = expressions[i];
      value = value.split("a").join(na);
      value = value.split("b").join(nb);
      value = value.split("c").join(nc);
      value = value.split("d").join(nd);
      if (Math.abs(eval(value) - 24) < 0.000001) {
        solutions.push(value);
      }
    }
    return solutions;
  }

  async append(result, expressions, na, nb, nc, nd) {
    var suffix = "*(" + nc + "-" + nd + ")";
    var solutions = await this.solve4(expressions, na, nb);
    for (var i = 0; i < solutions.length; i++) {
      result.push(solutions[i] + suffix);
    }
    return result;
  }

  async filter(input, nc, nd) {
    var pattern = "(" + nc + "-" + nd + ")";
    var output = [];
    for (var i = 0; i < input.length; i++) {
      var exp = input[i];
      var _exp_ = "(" + exp + ")";
      if (
        _exp_.indexOf("(" + pattern + "*") < 0 &&
        _exp_.indexOf("*" + pattern + ")") < 0 &&
        _exp_.indexOf("/" + pattern + ")") < 0
      ) {
        output.push(exp);
      }
    }
    return output;
  }
}

module.exports = JenosizeController;
