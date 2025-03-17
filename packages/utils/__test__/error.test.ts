import { describe, it, expect, vi } from "vitest";
import { throwError,debugWarn } from "../error";

describe("error",()=>{
    it("throwError should be worked",()=>{
        expect(()=>{
            throwError("scope","msg")
        }).toThrowError(`[scope]: msg`)
    })
    it("debugWarn should be worked",()=>{
        const warn = vi.spyOn(console,"warn").mockImplementation(()=>{})
        debugWarn('scope', 'msg')
        debugWarn(new SyntaxError(`custom error`))
        expect(warn.mock.calls).toMatchInlineSnapshot(`
          [
            [
              [Error: [scope]: msg],
            ],
            [
              [SyntaxError: custom error],
            ],
          ]
        `)
    })
})

