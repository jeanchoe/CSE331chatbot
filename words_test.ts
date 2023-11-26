// Collab Antonio Ji, David Lym
import * as assert from 'assert';
import {substitute, replaceWords, splitWords, wordsContain, joinWords } from './words';


describe('words', function() {

  it('substitute', function() {
    // TODO: (part 1c) add tests here
    const reps = new Map(
      [["a", "b"], ["yo", "hello"], ["earth", "creature"], ["goodbye", "peace"], ["alligator", "crocodile"], ["honey", "butter"]]
    );

    // Empty List
    let presub1: string[] = [];
    substitute(presub1, reps);
    assert.deepStrictEqual(presub1, []);
    // one input list no keyword in map
    let presub2: string[] = ["dog"];
    substitute(presub2, reps);
    assert.deepStrictEqual(presub2, ["dog"]);
    // one input list
    let presub3: string[] = ["a"];
    substitute(presub3, reps);
    assert.deepStrictEqual(presub3, ["b"]);
    let presub4: string[] = ["yo"];
    substitute(presub4, reps);
    assert.deepStrictEqual(presub4, ["hello"]);
    // more than one input list
    let presub5: string[] = ["goodbye", "honey"];
    substitute(presub5, reps);
    assert.deepStrictEqual(presub5, ["peace", "butter"]);
    let presub6: string[] = ["earth", "a", "alligator"];
    substitute(presub6, reps);
    assert.deepStrictEqual(presub6, ["creature", "b", "crocodile"]);

  });

  it('replaceWords', function() {
    const repl = new Map([["a", ["a", "b", "c"]], ["d", ["e", "f"]]]);
    assert.deepStrictEqual(replaceWords([], repl), []);
    assert.deepStrictEqual(replaceWords(["the"], repl), ["the"]);
    assert.deepStrictEqual(replaceWords(["a"], repl), ["a", "b", "c"]);
    assert.deepStrictEqual(replaceWords(["the", "a", "dog"], repl),
        ["the", "a", "b", "c", "dog"]);
    assert.deepStrictEqual(replaceWords(["the", "a", "dog", "d"], repl),
        ["the", "a", "b", "c", "dog", "e", "f"]);
  });

  it('splitWords', function() {
    assert.deepStrictEqual(splitWords(""), []);
    assert.deepStrictEqual(splitWords(" "), []);
    assert.deepStrictEqual(splitWords("."), ["."]);
    assert.deepStrictEqual(splitWords("a"), ["a"]);
    assert.deepStrictEqual(splitWords("abc"), ["abc"]);
    assert.deepStrictEqual(splitWords("ab,"), ["ab", ","]);
    assert.deepStrictEqual(splitWords("ab,c"), ["ab", ",", "c"]);
    assert.deepStrictEqual(splitWords("ab ,c"), ["ab", ",", "c"]);
    assert.deepStrictEqual(splitWords("ab, c"), ["ab", ",", "c"]);
    assert.deepStrictEqual(splitWords("ab , c"), ["ab", ",", "c"]);
    assert.deepStrictEqual(splitWords("a b , c"), ["a", "b", ",", "c"]);
    assert.deepStrictEqual(splitWords("abc, def! gh"), ["abc", ",", "def", "!", "gh"]);
    assert.deepStrictEqual(splitWords("abc def  gh"), ["abc", "def", "gh"]);
  });

  it('wordsContain', function() {
    assert.strictEqual(wordsContain([], ["a"]), -1);
    assert.strictEqual(wordsContain(["a", "b"], ["a"]), 0);
    assert.strictEqual(wordsContain(["c", "a", "b"], ["a"]), 1);
    assert.strictEqual(wordsContain(["c", "a", "c", "d"], ["d"]), 3);
    assert.strictEqual(wordsContain(["c", "a", "d", "c", "e"], ["a"]), 1);
    assert.strictEqual(wordsContain(["c", "a", "d", "c", "e"], ["f"]), -1);

    assert.strictEqual(wordsContain([], ["a", "b"]), -1);
    assert.strictEqual(wordsContain(["a", "b"], ["a", "b"]), 0);
    assert.strictEqual(wordsContain(["c", "a", "b"], ["a", "b"]), 1);
    assert.strictEqual(wordsContain(["c", "a", "c", "d"], ["a", "c"]), 1);
    assert.strictEqual(wordsContain(["c", "a", "d", "c", "e"], ["a", "c"]), -1);

    assert.strictEqual(wordsContain(["a", "b", "c", "d", "e"], ["a", "b", "c"]), 0);
    assert.strictEqual(wordsContain(["a", "b", "c", "d", "e"], ["a", "b", "d"]), -1);
    assert.strictEqual(wordsContain(["a", "b", "c", "d", "e"], ["b", "c", "d"]), 1);
    assert.strictEqual(wordsContain(["a", "b", "c", "d", "e"], ["b", "c", "a"]), -1);
    assert.strictEqual(wordsContain(["a", "b", "c", "d", "e"], ["c", "d", "e"]), 2);
    assert.strictEqual(wordsContain(["a", "b", "c", "d", "e"], ["c", "d", "c"]), -1);

    assert.strictEqual(wordsContain(["A", "B", "C", "D", "E"], ["c", "d", "e"]), 2);
    assert.strictEqual(wordsContain(["A", "B", "C", "D", "E"], ["c", "d", "c"]), -1);
  });

  it('joinWords', function() {
    assert.strictEqual(joinWords([]), "");
    assert.strictEqual(joinWords(["a"]), "a");
    assert.strictEqual(joinWords([","]), ",");
    assert.strictEqual(joinWords(["a", "!"]), "a!");
    assert.strictEqual(joinWords(["a", "b"]), "a b");
    assert.strictEqual(joinWords(["abc", "def"]), "abc def");
    assert.strictEqual(joinWords(["a", ",", "b"]), "a, b");
    assert.strictEqual(joinWords(["a", ",", "b", "c", "!"]), "a, b c!");
    assert.strictEqual(joinWords(["a", ",", "b", "c", "!", "d"]), "a, b c! d");
    assert.strictEqual(joinWords(["what", "?", "!", "?"]), "what?!?");
  });

});
