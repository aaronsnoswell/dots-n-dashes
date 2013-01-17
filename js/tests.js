
var tests;

;(function(global) {

    // Shared setup / teardown variables
    var game;

    var player1 = 1,
        player2 = 2;

    var dot_valid_normal = new DnD.Dot(2, 3),
        dot_valid_00 = new DnD.Dot(0, 0),
        dot_valid_01 = new DnD.Dot(0, 1),
        dot_valid_10 = new DnD.Dot(1, 0),
        dot_valid_11 = new DnD.Dot(1, 1),
        dot_valid_99 = new DnD.Dot(9, 9);

    var dot_invalid_negative = new DnD.Dot(-1, -1),
        dot_invalid_10s = new DnD.Dot(10, 10),
        dot_invalid_109 = new DnD.Dot(10, 9),
        dot_invalid_toolarge = new DnD.Dot(9999999, 9999999),
        dot_invalid_null = null,
        dot_invalid_undefined,
        dot_invalid_intfloat = new DnD.Dot(3, 1.23234),
        dot_invalid_floatfloat = new DnD.Dot(1.23423, 7.3453),
        dot_invalid_intnull = new DnD.Dot(2, null),
        dot_invalid_stringint = new DnD.Dot("5", 3),
        dot_invalid_stringfloat = new DnD.Dot(2, "6"),
        dot_invalid_nan = new DnD.Dot(2, NaN),
        dot_invalid_infinity = new DnD.Dot(2, Infinity);


    function setup(test_description) {
        console.log("Test: " + test_description);
        game = new DnD.CoreGame();
    }

    function teardown() {
        game = undefined;
    }




    /**
     * Tests the CoreGame.add_fash function
     */
    function t_CoreGame_add_dash() {
        setup("CoreGame.add_dash");

        // Positive functional tests
        game.add_dash(player1, dot_valid_00, dot_valid_01);
        assert(game.board_dashes.length == 1, "After adding valid dash, board should have exactly 1 dash");
        assert(game.board_dashes[0].player_id == player1, "Added dash should have given player id");

        var dash_dots = [game.board_dashes[0].d1, game.board_dashes[0].d2],
            expected_dots = [dot_valid_00, dot_valid_01];
        assert(Utils.compare_arrays(dash_dots, expected_dots), "Added dash should have given Dots");

        assert(game.board_dashes[0].dash_id != null, "Added dash should not have null dash_id");
        assert(game.board_dashes[0].dash_id != undefined, "Added dash should not have null dash_id");

        // Negative functional tests
        

        teardown();
    }

    /**
     * Tests the CoreGame.check_scores function
     */
    function t_CoreGame_check_scores() {
        setup("CoreGame.check_scores");

        // Positive functional tests
        console.log("TODO");
        
        // Negative functional tests

        teardown();
    }

    /**
     * Tests the CoreGame._find_box_dashes function
     */
    function t_CoreGame__find_box_dashes() {
        setup("CoreGame._find_box_dashes");

        // Positive functional tests
        console.log("TODO");

        // Negative functional tests

        teardown();
    }

    /**
     * Tests the CoreGame._newest_dash function
     */
    function t_CoreGame__newest_dash() {
        setup("CoreGame._newest_dash");

        // Positive functional tests
        console.log("TODO");

        // Negative functional tests

        teardown();
    }

    /**
     * Tests the CoreGame._dash_of_box function
     */
    function t_CoreGame__dash_of_box() {
        setup("CoreGame._dash_of_box");

        // Positive functional tests
        console.log("TODO");

        // Negative functional tests

        teardown();
    }

    /**
     * Tests the CoreGame._box_exists function
     */
    function t_CoreGame__box_exists() {
        setup("CoreGame._box_exists");

        // Positive functional tests
        console.log("TODO");

        // Negative functional tests

        teardown();
    }

    /**
     * Tests the CoreGame._validate_dot function
     */
    function t_CoreGame__validate_dot() {
        setup("CoreGame._validate_dot");

        // Positive functional tests
        console.log("TODO");

        // Negative functional tests

        teardown();
    }

    /**
     * Tests the CoreGame._validate_row function
     */
    function t_CoreGame__validate_row() {
        setup("CoreGame._validate_row");

        // Positive functional tests
        console.log("TODO");

        // Negative functional tests

        teardown();
    }

    /**
     * Tests the CoreGame._validate_col function
     */
    function t_CoreGame__validate_col() {
        setup("CoreGame._validate_col");

        // Positive functional tests
        console.log("TODO");

        // Negative functional tests

        teardown();
    }

    /**
     * Tests the CoreGame._dot_in_board function
     */
    function t_CoreGame__dot_in_board() {
        setup("CoreGame._dot_in_board");

        // Positive functional tests
        assert(game._dot_in_board(dot_valid_normal),            "Normal dot should be in board");
        assert(game._dot_in_board(dot_valid_00),                "0,0 dot should be in board");
        assert(game._dot_in_board(dot_valid_01),                "0,1 dot should be in board");
        assert(game._dot_in_board(dot_valid_10),                "1,0 dot should be in board");
        assert(game._dot_in_board(dot_valid_99),                "9,9 dot should be in board");

        // Negative functional tests
        assert(!game._dot_in_board(dot_invalid_negative),       "-ve dot should not be in board");
        assert(!game._dot_in_board(dot_invalid_10s),            "10,10 should not be in board");
        assert(!game._dot_in_board(dot_invalid_109),            "10,9 dot should not be in board");
        assert(!game._dot_in_board(dot_invalid_toolarge),       "large dot should not be in board");
        assert(!game._dot_in_board(dot_invalid_null),           "null should not be in board");
        assert(!game._dot_in_board(dot_invalid_undefined),      "undefined should not be in board");
        assert(!game._dot_in_board(dot_invalid_intfloat),       "dot with one decimal value should not be in board");
        assert(!game._dot_in_board(dot_invalid_floatfloat),     "dot with multiple decimal values should not be in board");
        assert(!game._dot_in_board(dot_invalid_intnull),        "dot with one null value should not be in board");
        assert(!game._dot_in_board(dot_invalid_stringint),      "dot with string value should not be in board");
        assert(!game._dot_in_board(dot_invalid_stringfloat),    "dot with string and decimal values should not be in board");
        assert(!game._dot_in_board(dot_invalid_nan),            "dot with NaN value should not be in board");
        assert(!game._dot_in_board(dot_invalid_infinity),       "dot with Infinite value should not be in board");

        teardown();
    }

    /**
     * Tests the CoreGame._dots_nearby function
     */
    function t_CoreGame__dots_nearby() {
        setup("CoreGame._dots_nearby");

        // Positive functional tests
        assert(game._dots_nearby(dot_valid_00, dot_valid_10),   "Dots one row apart should be nearby");
        assert(game._dots_nearby(dot_valid_00, dot_valid_01),   "Dots one column apart should be nearby");
        
        // Negative functional tests
        assert(!game._dots_nearby(dot_valid_00, dot_valid_99),              "Dots on opposite sides of the board should not be nearby");
        assert(!game._dots_nearby(dot_valid_00, dot_valid_00),              "The same Dot should not be nearby itself");
        assert(!game._dots_nearby(dot_valid_00, dot_invalid_negative),      "Valid and invalid (negative) dots should not be nearby");
        assert(!game._dots_nearby(dot_valid_00, dot_invalid_10s),           "Valid and invalid (>9) dots should not be nearby");
        assert(!game._dots_nearby(dot_valid_00, dot_invalid_toolarge),      "Valid and invalid (too large) dots should not be nearby");
        assert(!game._dots_nearby(dot_valid_00, dot_invalid_null),          "Valid and invalid (null) dots should not be nearby");
        assert(!game._dots_nearby(dot_valid_00, dot_invalid_undefined),     "Valid and invalid (undefined) dots should not be nearby");
        assert(!game._dots_nearby(dot_valid_00, dot_invalid_floatfloat),    "Valid and invalid (decimal value) dots should not be nearby");
        assert(!game._dots_nearby(dot_valid_00, dot_invalid_stringint),     "Valid and invalid (string value) dots should not be nearby");
        assert(!game._dots_nearby(dot_valid_00, dot_invalid_nan),           "Valid and invalid (NaN) dots should not be nearby");
        assert(!game._dots_nearby(dot_valid_00, dot_invalid_infinity),      "Valid and invalid (ininite) dots should not be nearby");
        assert(!game._dots_nearby(dot_invalid_10s, dot_invalid_10s),        "Invalid dots should not be nearby");

        teardown();
    }

    /**
     * Tests the CoreGame._dash_exists function
     * @precondition Assumes the CoreGame.add_dash function works
     */
    function t_CoreGame__dash_exists() {
        setup("CoreGame._dash_exists");

        // Positive functional tests
        game.add_dash(player1, dot_valid_00, dot_valid_01);
        game.add_dash(player1, dot_valid_00, dot_valid_10);

        assert(game._dash_exists(dot_valid_00, dot_valid_01), "Valid vertical dash should exist");
        assert(game._dash_exists(dot_valid_00, dot_valid_10), "Valid horizontal dash should exist");

        // Negative functional tests
        assert(!game._dash_exists(dot_valid_10, dot_valid_11), "Dash between arbitrary dots next to each other should not exist");
        assert(!game._dash_exists(dot_valid_00, dot_valid_99), "Dash between arbitrary valid dots too far apart should not exist");
        assert(!game._dash_exists(dot_valid_00, dot_invalid_negative), "Dash between valid and invalid (negative) dots should not exist");
        assert(!game._dash_exists(dot_valid_00, dot_invalid_null), "Dash between valid and invalid (null) dots should not exist");
        assert(!game._dash_exists(dot_valid_00, dot_invalid_undefined), "Dash between valid and invalid (undefined) dots should not exist");
        assert(!game._dash_exists(dot_invalid_null, dot_invalid_negative), "Dash between invalid dots should not exist");

        teardown();
    }


    /**
     * Asserts that the given expression evaluates to true
     * @param Boolean expr A boolean expression that is expected to evaluate to
     *  true
     * @param String message A message that describes the expression being
     *  evaluated
     */
    function assert(expr, message) {
        try {
            if(!expr) {
                throw "Expression failed";
            } else {
                //console.log("Assert passed: " + message);
            }
        } catch (err) {
            console.log("Assert failed: " + message);
        }
    }

    /*
    var game = new DnD.CoreGame();

    function test_coregame() {
        var player_1 = 1,
            player_2 = 2;

        //game = new CoreGame();

        var rnd_dot = function() {
            return new DnD.Dot(
                Math.floor(Math.random()*game.BOARD_WIDTH*2 - game.BOARD_WIDTH*0.5),
                Math.floor(Math.random()*game.BOARD_HEIGHT*2 - game.BOARD_HEIGHT*0.5)
            );
        }

        for(i=0; i<10000; i++) {
            game.add_dash(player_1, rnd_dot(), rnd_dot());
            game.add_dash(player_2, rnd_dot(), rnd_dot());

            //if(i%10000 == 0) {
            //    console.log("At " + i);
            //}
        }

        console.log(game.board_dashes);
        console.log(game.board_boxes);
        console.log(game);
    }
    */

    tests = function() {
        t_CoreGame_add_dash();
        t_CoreGame_check_scores();
        t_CoreGame__find_box_dashes();
        t_CoreGame__newest_dash();
        t_CoreGame__dash_of_box();
        t_CoreGame__box_exists();
        t_CoreGame__validate_dot();
        t_CoreGame__validate_row();
        t_CoreGame__validate_col();
        t_CoreGame__dot_in_board();
        t_CoreGame__dots_nearby();
        t_CoreGame__dash_exists();
    }

})(this);

tests();


