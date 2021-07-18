package com.example.lookandsay;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class ListLookAndSayTest {
    /**
     *  1 // 0
     *  1 1 // 1
     *  2 1 // 2
     *  1 2 1 1 // 3
     *  1 1 1 2 2 1 // 4
     */

    @Test
    void testAnt() {
        Assertions.assertEquals(ListLookAndSay.ant(1), Arrays.asList(1, 1));
        Assertions.assertEquals(ListLookAndSay.ant(2), Arrays.asList(2, 1));
        Assertions.assertEquals(ListLookAndSay.ant(3), Arrays.asList(1, 2, 1, 1));
        Assertions.assertEquals(ListLookAndSay.ant(4), Arrays.asList(1, 1, 1, 2, 2, 1));
    }
}